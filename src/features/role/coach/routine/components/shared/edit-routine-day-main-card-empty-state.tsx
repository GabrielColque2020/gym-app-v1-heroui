import {Card} from "@heroui/react";

export function EditRoutineDayMainCardEmptyState() {
    return (
        <Card className={"border border-border px-4 py-10 text-center text-sm text-muted"}>
            Este dia no tiene ejercicios cargados.
        </Card>
    );
}
