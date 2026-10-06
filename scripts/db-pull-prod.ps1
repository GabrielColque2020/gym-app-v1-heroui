# Copia la base de produccion a la base local de Docker (gym-app-db).
#
# De produccion solo LEE (pg_dump). Lo unico que se pisa es la base local, y
# el destino esta fijo al contenedor: no hay forma de apuntarlo a otro lado.
#
# Necesita en .env la conexion DIRECTA de produccion (no la de Accelerate):
#   PROD_DATABASE_URL="postgres://...@db.prisma.io:5432/postgres?sslmode=require"
#
# Uso: pnpm db:pull-prod
param(
	# Solo para probar el script contra otra base.
	[string]$SourceUrl
)

$ErrorActionPreference = "Stop"
$container = "gym-app-db"

if (-not $SourceUrl) {
	$envFile = Join-Path $PSScriptRoot "..\.env"
	$line = Get-Content $envFile | Where-Object { $_ -match '^\s*PROD_DATABASE_URL\s*=' } | Select-Object -First 1

	if (-not $line) {
		Write-Error "Falta PROD_DATABASE_URL en .env (la conexion directa de produccion)."
	}

	$SourceUrl = ( $line -replace '^\s*PROD_DATABASE_URL\s*=\s*', '' ).Trim().Trim( '"' ).Trim( "'" )
}

if ($SourceUrl -notmatch '^postgres(ql)?://') {
	Write-Error "PROD_DATABASE_URL tiene que ser una URL postgres:// directa, no la de Accelerate."
}

# El pooler no sirve para pg_dump; en Prisma Postgres la directa solo cambia el host.
$SourceUrl = $SourceUrl -replace 'pooled\.db\.prisma\.io', 'db.prisma.io'

if (-not ( docker ps --filter "name=^$container$" --format "{{.Names}}" )) {
	Write-Error "El contenedor $container no esta corriendo. Corre primero: pnpm db:up"
}

$env:SOURCE_URL = $SourceUrl
$env:LOCAL_URL = "postgresql://postgres:postgres@localhost:5432/gym_app"

# Un contenedor descartable con el cliente de Postgres 17 (pg_dump no puede leer
# un servidor mas nuevo que el), en la red del contenedor local. El dump va a un
# archivo y se restaura en una sola transaccion: si algo falla, la base local
# queda como estaba.
#
# La base local se vacia entera antes de restaurar (no con `pg_dump --clean`):
# local y produccion pueden tener constraints con nombres distintos, y un DROP
# objeto por objeto falla con los que produccion no conoce.
$env:RESET_SQL = "DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;"

$steps = @(
	'set -efo pipefail',
	'echo Descargando produccion...',
	'pg_dump --no-owner --no-privileges --schema=public -d $SOURCE_URL -f /tmp/prod.sql',
	# pg_dump 17 escribe un SET que Postgres 16 no conoce, y el schema ya lo crea el reset.
	'sed -i -e /transaction_timeout/d -e /^CREATE.SCHEMA.public/d /tmp/prod.sql',
	'printenv RESET_SQL > /tmp/reset.sql',
	'echo Restaurando en local...',
	'psql -q -1 -v ON_ERROR_STOP=1 -d $LOCAL_URL -f /tmp/reset.sql -f /tmp/prod.sql -o /dev/null'
) -join '; '

docker run --rm --network "container:$container" -e SOURCE_URL -e LOCAL_URL -e RESET_SQL postgres:17 bash -c $steps

if ($LASTEXITCODE -ne 0) {
	Write-Error "La copia fallo. La base local no se modifico."
}

Write-Host "Listo: la base local es una copia de produccion."
