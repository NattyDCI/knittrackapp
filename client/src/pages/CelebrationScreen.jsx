import { useEffect, useRef } from "react";
import p5 from "p5";

export default function CelebrationScreen({ onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.replaceChildren();

    let instance;

    const sketch = (p) => {
      let yarns = [];

      p.setup = () => {
        p.createCanvas(320, 320);

        for (let i = 0; i < 25; i++) {
          yarns.push({
            x: p.random(p.width),
            y: p.random(-300, 0),
            speed: p.random(1, 3),
            size: p.random(24, 38),
            rotation: p.random(-0.5, 0.5),
            spin: p.random(-0.015, 0.015),
            color: p.random([
              "#14b5e8",
              "#705d5d",
              "#d9a7a7",
              "#f0c7b7",
              "#c9a66b",
              "#8f6f5e",
            ]),
          });
        }
      };

      function drawYarnSkein(x, y, size, rotation, yarnColor) {
        p.push();
        p.translate(x, y);
        p.rotate(rotation);

        const w = size * 1.15;
        const h = size * 1.8;

        p.noStroke();
        p.fill(yarnColor);
        p.ellipse(0, -h * 0.22, w, h * 0.75);
        p.ellipse(0, h * 0.22, w, h * 0.75);

        p.fill("#e6e3df");
        p.stroke("#1f1f1f");
        p.strokeWeight(1.5);

        p.beginShape();
        p.vertex(-w * 0.48, -h * 0.22);
        p.vertex(w * 0.48, -h * 0.22);
        p.vertex(w * 0.48, h * 0.22);
        p.vertex(-w * 0.48, h * 0.22);
        p.endShape(p.CLOSE);

        p.noFill();
        p.stroke("#1f1f1f");
        p.strokeWeight(1.4);

        p.arc(-w * 0.18, -h * 0.35, w * 0.55, h * 0.45, -1.2, 0.15);
        p.arc(0, -h * 0.28, w * 0.45, h * 0.38, 2.7, 3.8);
        p.arc(-w * 0.12, h * 0.33, w * 0.58, h * 0.42, 1.4, 2.9);
        p.arc(w * 0.05, h * 0.28, w * 0.65, h * 0.5, 1.6, 3.1);

        p.line(w * 0.22, h * 0.03, w * 0.2, h * 0.17);
        p.line(w * 0.3, h * 0.05, w * 0.27, h * 0.2);

        p.pop();
      }

      p.draw = () => {
        p.background(250, 240, 230);

        yarns.forEach((yarn) => {
          drawYarnSkein(yarn.x, yarn.y, yarn.size, yarn.rotation, yarn.color);

          yarn.y += yarn.speed;
          yarn.rotation += yarn.spin;

          if (yarn.y > p.height + 60) {
            yarn.y = p.random(-120, 0);
            yarn.x = p.random(p.width);
          }
        });
      };
    };

    instance = new p5(sketch, container);

    return () => {
      instance.remove();
      container.replaceChildren();
    };
  }, []);

  return (
    <section id="celebrationScreen" className="screen active celebration-sc">
      <h1>Milestone completed!</h1>
      <p className="subtitle">Great job!</p>

      <div className="celebration-canvas-wrapper">
        <div className="p5-container" ref={containerRef}></div>
      </div>

      <button
        id="closeCelebrationBtn"
        className="main-btn celebration-btn"
        onClick={onClose}
      >
        Continue
      </button>
    </section>
  );
}
