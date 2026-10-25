"use client";

import { useState } from "react";
import {
  RobotHead,
  robotHeadShapes,
  robotHeadStates,
  type RobotHeadShape,
  type RobotHeadState,
} from "robot-heads";

interface RobotCompanionProps {
  initialShape?: RobotHeadShape;
  initialState?: RobotHeadState;
  initialColor?: string;
  initialTrimColor?: string;
  initialSize?: number;
  showControls?: boolean;
}

export function RobotCompanion({
  initialShape = "hexagon",
  initialState = "sleeping",
  initialColor = "#2f8f58",
  initialTrimColor = "#c4c9d2",
  initialSize = 180,
  showControls = true,
}: RobotCompanionProps) {
  const [shape, setShape] = useState<RobotHeadShape>(initialShape);
  const [state, setState] = useState<RobotHeadState>(initialState);
  const [color, setColor] = useState(initialColor);
  const [trimColor, setTrimColor] = useState(initialTrimColor);
  const [screenColor, setScreenColor] = useState("#f4f6f8");
  const [size, setSize] = useState(initialSize);
  const [antenna, setAntenna] = useState(true);
  const [floorShadow, setFloorShadow] = useState(true);
  const [interactive, setInteractive] = useState(true);
  const [copied, setCopied] = useState(false);

  const resetToPrompt = () => {
    setShape("hexagon");
    setState("sleeping");
    setColor("#2f8f58");
    setTrimColor("#c4c9d2");
    setScreenColor("#f4f6f8");
    setSize(180);
    setAntenna(true);
    setFloorShadow(true);
    setInteractive(true);
  };

  const codeSnippet = `<RobotHead
  shape="${shape}"
  state="${state}"
  color="${color}"
  trimColor="${trimColor}"${size !== 160 ? `\n  size={${size}}` : ""}${!antenna ? `\n  antenna={false}` : ""}${!floorShadow ? `\n  floorShadow={false}` : ""}
/>`;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="robot-showcase">
      <div className="robot-stage">
        <div className="robot-wrapper">
          <RobotHead
            shape={shape}
            state={state}
            color={color}
            trimColor={trimColor}
            screenColor={screenColor}
            size={size}
            antenna={antenna}
            floorShadow={floorShadow}
            interactive={interactive}
          />
        </div>
        <p className="robot-stage__hint">
          {interactive
            ? "Hover to look around · Click to hop & spin"
            : "Interactive motion paused"}
        </p>
      </div>

      {showControls && (
        <div className="robot-controls">
          <div className="robot-controls__header">
            <h3 className="robot-controls__title">Robot Head Playground</h3>
            <button
              type="button"
              className="robot-reset-btn"
              onClick={resetToPrompt}
            >
              Reset to Prompt Defaults
            </button>
          </div>

          <div className="robot-control-group">
            <span className="robot-control-label">State</span>
            <div className="robot-pills">
              {robotHeadStates.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`robot-pill ${state === s ? "is-active" : ""}`}
                  onClick={() => setState(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="robot-control-group">
            <span className="robot-control-label">Shape</span>
            <div className="robot-pills">
              {robotHeadShapes.map((shp) => (
                <button
                  key={shp}
                  type="button"
                  className={`robot-pill ${shape === shp ? "is-active" : ""}`}
                  onClick={() => setShape(shp)}
                >
                  {shp}
                </button>
              ))}
            </div>
          </div>

          <div className="robot-control-row">
            <div className="robot-field">
              <label htmlFor="robot-color" className="robot-control-label">
                Shell Color
              </label>
              <div className="robot-color-input-wrap">
                <input
                  id="robot-color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="robot-hex-input"
                />
              </div>
            </div>

            <div className="robot-field">
              <label htmlFor="robot-trim" className="robot-control-label">
                Trim Color
              </label>
              <div className="robot-color-input-wrap">
                <input
                  id="robot-trim"
                  type="color"
                  value={trimColor}
                  onChange={(e) => setTrimColor(e.target.value)}
                />
                <input
                  type="text"
                  value={trimColor}
                  onChange={(e) => setTrimColor(e.target.value)}
                  className="robot-hex-input"
                />
              </div>
            </div>

            <div className="robot-field">
              <label htmlFor="robot-size" className="robot-control-label">
                Size ({size}px)
              </label>
              <input
                id="robot-size"
                type="range"
                min="100"
                max="260"
                step="10"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="robot-range-input"
              />
            </div>
          </div>

          <div className="robot-toggles">
            <label className="robot-toggle-label">
              <input
                type="checkbox"
                checked={antenna}
                onChange={(e) => setAntenna(e.target.checked)}
              />
              <span>Antenna</span>
            </label>
            <label className="robot-toggle-label">
              <input
                type="checkbox"
                checked={floorShadow}
                onChange={(e) => setFloorShadow(e.target.checked)}
              />
              <span>Floor Shadow</span>
            </label>
            <label className="robot-toggle-label">
              <input
                type="checkbox"
                checked={interactive}
                onChange={(e) => setInteractive(e.target.checked)}
              />
              <span>Pointer Interactive</span>
            </label>
          </div>

          <div className="robot-snippet">
            <div className="robot-snippet__header">
              <span>React JSX</span>
              <button
                type="button"
                className="robot-copy-btn"
                onClick={copyCode}
              >
                {copied ? "Copied!" : "Copy JSX"}
              </button>
            </div>
            <pre>
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
