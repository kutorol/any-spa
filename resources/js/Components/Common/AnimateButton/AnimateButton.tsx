import { motion, useCycle } from "framer-motion";
import * as React from "react";
import { forwardRef } from "react";

interface IScaleObject {
  hover: number | string;
  tap: number | string;
}

interface IAnimateButton {
  children: any;
  type: "slide" | "scale" | "rotate";
  direction: "up" | "down" | "left" | "right";
  offset: number;
  scale: number | IScaleObject;
}

// @ts-ignore
const AnimateButton = forwardRef(({
                                    children,
                                    type = "scale",
                                    direction = "right",
                                    offset = 10,
                                    scale = { hover: 1, tap: 0.9 }
                                  }: IAnimateButton, ref) => {
  let offset1;
  let offset2;
  switch (direction) {
    case "up":
    case "left":
      offset1 = offset;
      offset2 = 0;
      break;
    case "right":
    case "down":
    default:
      offset1 = 0;
      offset2 = offset;
      break;
  }

  const [x, cycleX] = useCycle(offset1, offset2);
  const [y, cycleY] = useCycle(offset1, offset2);

  switch (type) {
    case "rotate":
      return (
        <motion.div
          // @ts-ignore
          ref={ref}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            repeatDelay: 0
          }}
        >
          {children}
        </motion.div>
      );
    case "slide":
      if (direction === "up" || direction === "down") {
        return (
          <motion.div
            // @ts-ignore
            ref={ref}
            animate={{ y: y !== undefined ? y : "" }}
            onHoverEnd={() => cycleY()}
            onHoverStart={() => cycleY()}
          >
            {children}
          </motion.div>
        );
      }
      return (
        <motion.div
          // @ts-ignore
          ref={ref}
          animate={{ x: x !== undefined ? x : "" }}
          onHoverEnd={() => cycleX()}
          onHoverStart={() => cycleX()}
        >
          {children}
        </motion.div>
      );

    case "scale":
    default:
      if (typeof scale === "number") {
        scale = {
          hover: scale,
          tap: scale
        } as IScaleObject;
      }
      return (
        <motion.div
          // @ts-ignore
          ref={ref}
          whileHover={{ scale: scale.hover }}
          whileTap={{ scale: scale.tap }}
        >
          {children}
        </motion.div>
      );
  }
});

export default AnimateButton;
