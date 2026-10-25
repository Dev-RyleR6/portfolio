import type { Metadata } from "next";
import { RobotCompanion } from "@/components/RobotCompanion";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Robot Heads Experiment",
  "Experimental robot-heads avatar component testing hexagon sleeping state and interactive controls.",
  "/robot"
);

export default function RobotPage() {
  return (
    <section className="content-section robot-page" aria-labelledby="robot-title">
      <div className="section-heading profile-section-heading">
        <h1 id="robot-title">Robot Heads Experiment</h1>
        <p>
          Testing the <code>robot-heads</code> package featuring animated TV-head robots with customizable shapes, states, shell colors, and pointer-following interaction.
        </p>
      </div>

      <div className="robot-experiment-container">
        <RobotCompanion
          initialShape="hexagon"
          initialState="sleeping"
          initialColor="#2f8f58"
          initialTrimColor="#c4c9d2"
          initialSize={180}
          showControls={true}
        />
      </div>
    </section>
  );
}

