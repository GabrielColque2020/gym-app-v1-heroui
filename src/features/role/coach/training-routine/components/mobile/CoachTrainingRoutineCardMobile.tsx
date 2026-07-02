"use client";
import type { CoachTrainingRoutine } from "@/features/role/coach/training-routine/actions/get-training-routines-by-student";
import {
  Card,
  Chip,
  Description,
  Label,
  ScrollShadow,
  Typography,
} from "@heroui/react";
import { RadioButtonGroup } from "@heroui-pro/react";
import { useTrainingRoutineSelection } from "@/features/trainingRoutine/hooks/useTrainingRoutineSelection";
import { CoachTrainingRoutineDaysAccordion } from "@/features/role/coach/training-routine/components/shared/CoachTrainingRoutineDaysAccordion";
type CoachTrainingRoutineCardMobileProps = {
  month: number;
  routines: CoachTrainingRoutine[];
  studentId: string;
  year: number;
};
export function CoachTrainingRoutineCardMobile({
  month,
  routines,
  studentId,
  year,
}: CoachTrainingRoutineCardMobileProps) {
  const { selectedRoutine, selectedRoutineId, setSelectedRoutineId } =
    useTrainingRoutineSelection(routines);
  return (
    <Card className={"w-full overflow-hidden"}>
      {" "}
      <Card.Header className={"gap-3 pb-3 pt-4"}>
        {" "}
        <Card.Content className={"min-w-0"}>
          {" "}
          <Card.Title className={"text-base font-semibold"}>
            Rutina del mes
          </Card.Title>{" "}
          <Card.Description className={"text-sm"}>
            Gestiona semanas y dias
          </Card.Description>{" "}
        </Card.Content>{" "}
        <Chip
          className={"w-fit shrink-0 px-2"}
          color={"accent"}
          size={"sm"}
          variant={"soft"}
        >
          {" "}
          {routines.length} semanas{" "}
        </Chip>{" "}
      </Card.Header>{" "}
      <Card.Content className={"flex flex-col gap-4 pb-4"}>
        {" "}
        <div className={"grid gap-2"}>
          {" "}
          <div className={"flex items-center justify-between gap-3"}>
            {" "}
            <Label className={"text-sm font-semibold"}>Semana</Label>{" "}
          </div>{" "}
          <ScrollShadow hideScrollBar orientation={"horizontal"}>
            {" "}
            <RadioButtonGroup
              className={
                "flex w-full gap-2 [--radio-button-group-item-radius:0.75rem] px-0.5 py-1"
              }
              name={"routine-week-mobile"}
              value={selectedRoutineId}
              variant={"secondary"}
              onChange={(value) => setSelectedRoutineId(value as string)}
            >
              {" "}
              <div className={"grid grid-cols-2 gap-2"}>
                {" "}
                {routines.map((routine) => (
                  <RadioButtonGroup.Item
                    key={routine.id}
                    className={"w-full gap-2 px-3 py-2.5"}
                    value={routine.id}
                  >
                    {" "}
                    <RadioButtonGroup.Indicator />{" "}
                    <RadioButtonGroup.ItemContent>
                      {" "}
                      <Label className={"text-sm"}>
                        Semana {routine.week}
                      </Label>{" "}
                      <Description className={"text-xs"}>
                        {" "}
                        {routine.routineDays.length} dias{" "}
                      </Description>{" "}
                    </RadioButtonGroup.ItemContent>{" "}
                  </RadioButtonGroup.Item>
                ))}{" "}
              </div>{" "}
            </RadioButtonGroup>{" "}
          </ScrollShadow>{" "}
        </div>{" "}
        <div className={"grid gap-2 pt-4"}>
          {" "}
          <div className={"flex items-center justify-between gap-3"}>
            {" "}
            <div className={"min-w-0"}>
              {" "}
              <Typography className={"truncate text-sm font-semibold"}>
                {" "}
                {selectedRoutine
                  ? `Semana ${selectedRoutine.week}`
                  : "Sin semana seleccionada"}{" "}
              </Typography>{" "}
              <Description className={"truncate text-xs"}>
                {" "}
                {selectedRoutine?.name || "Dias de entrenamiento"}{" "}
              </Description>{" "}
            </div>{" "}
          </div>{" "}
          <CoachTrainingRoutineDaysAccordion
            days={selectedRoutine?.routineDays ?? []}
            month={month}
            studentId={studentId}
            year={year}
          />{" "}
        </div>{" "}
      </Card.Content>{" "}
    </Card>
  );
}
