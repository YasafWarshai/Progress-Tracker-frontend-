import { Grid, Heading } from "@chakra-ui/react";
import ScheduleTile from "./ScheduleTile";

export default function ScheduleGrid({ goals, view }) {

  return (
    <>
      {view === 1 ?
        <Grid
          templateColumns={"repeat(7, minmax(8rem, 8rem))"}
          justifyContent="center"
          gap={2}
        >
          {goals.map((goal, index) => {
            if (/28|29|30|31|32|33|34/.test(index))
            return <ScheduleTile key={goal.id} goal={goal} tileMargin={22} tileWidth="8rem" view={view} />
            else return <ScheduleTile key={goal.id} goal={goal} tileMargin={0} tileWidth="8rem" view={view} />
          })}
        </Grid>
      :
        <Grid
          templateColumns={"repeat(1, minmax(80vw, 80vw))"}
          justifyContent="center"
          gap={2}
        >
          {goals.map((goal, index) => {
            if (index % 7 === 0)
            return (
              <>
                <Heading key={goal.title} mt={22} mx="auto">WEEK {(index / 7) + 1}</Heading>
                <ScheduleTile key={goal.content} goal={goal} tileMargin={22} tileWidth="60vw" view={view} />
              </>
            )
            else return <ScheduleTile key={goal.id} goal={goal} tileMargin={0} tileWidth="60vw" view={view} />
          })}
        </Grid>
      }
    </>
  )
}