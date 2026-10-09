import { Avatar } from "@heroui/react";

import type { Role } from "@/generated/prisma/client";

export function InitialsAvatar( { className = "size-10", name }: { className?: string; name: string } ) {
	return (
		<Avatar
			className={ `${ className } shrink-0 rounded-full bg-linear-to-br from-accent via-accent/80 to-primary text-accent-foreground shadow-sm` }
		>
			<Avatar.Fallback className={ "bg-transparent text-sm font-bold text-accent-foreground" }>
				{ getInitials( name ) }
			</Avatar.Fallback>
		</Avatar>
	);
}

function getInitials( name: string ) {
	const parts = name.trim().split( /\s+/ ).filter( Boolean );
	const initials = parts.slice( 0, 2 ).map( ( part ) => part[ 0 ]?.toUpperCase() ?? "" ).join( "" );

	return initials || "U";
}

export function getRoleLabel( role: Role ) {
	if (role === "ADMIN") {
		return "Administrador";
	}

	return role === "COACH" ? "Entrenador" : "Estudiante";
}
