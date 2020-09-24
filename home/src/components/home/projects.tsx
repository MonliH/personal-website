import React, { useState, useLayoutEffect } from "react";
import { useTransition, animated, useSpring } from "react-spring";

import { useInView } from "react-intersection-observer";

import "../../css/projects.css";

enum Tag {
  // Languages
  Typescript = "Typescript",
  Rust = "Rust",
  Python = "Python",

  // Libraries/frameworks
  React = "React",
  ML = "Machine Learning",
}

const tag_color = (tag: Tag) => {
  switch (tag) {
    case Tag.Rust: {
      return "#dea584";
    }
    case Tag.Typescript: {
      return "#2b7489";
    }
    case Tag.Python: {
      return "#3572a5";
    }
    case Tag.React: {
      return "#38d138";
    }
    case Tag.ML: {
      return "#9636d1";
    }
  }
};

interface Project {
  display_name: string;
  rank: number;
  link: string;
  tags: Array<Tag>;
  description: string;
}

const project_list: Array<Project> = [
  {
    display_name: "fluo-lang",
    rank: 0,
    link: "https://github.com/fluo-lang/fluoc",
    tags: [Tag.Rust],
    description: "a compiled programming language",
  },

  {
    display_name: "audioify",
    rank: 2,
    link: "https://github.com/MonliH/audioify",
    tags: [Tag.Typescript, Tag.React],
    description: "generate music from code",
  },

  {
    display_name: "iNNteractive",
    rank: 3,
    link: "https://github.com/MonliH/iNNteractive",
    tags: [Tag.Python, Tag.ML],
    description: "interactive neural networks behind a GUI",
  },

  {
    display_name: "emu-rs",
    rank: 4,
    link: "https://github.com/MonliH/emurs",
    tags: [Tag.Rust],
    description: "an emulator for the 8080 microprocessor",
  },

  {
    display_name: "pyarkovchain",
    rank: 5,
    link: "https://github.com/MonliH/pyarkovchain",
    tags: [Tag.Python],
    description: "a markov chain library for python",
  },

  {
    display_name: "four-ai",
    rank: 6,
    link: "https://github.com/MonliH/four-ai",
    tags: [Tag.Rust, Tag.ML],
    description:
      "neural networks trained with genetic algorithm that play connect four",
  },

  {
    display_name: "personal-website",
    rank: 7,
    link: "https://github.com/MonliH/personal-website",
    tags: [Tag.Typescript, Tag.React],
    description: "you're looking at it right now",
  },

  {
    display_name: "neutron-lang",
    rank: 8,
    link: "https://github.com/the-neutron-foundation/neutron-language",
    tags: [Tag.Python],
    description: "an interpreted programming language",
  },
];

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

interface ProjectCardLinkProps {
  project_link: string;
  project_name: string;
}

const ProjectCardLink = (p: ProjectCardLinkProps) => {
  let [anim, set_link] = useSpring(() => ({
    textDecorationColor: "rgba(0, 0, 0, 0)",
  }));

  const on_mouse_enter = () => {
    set_link({ textDecorationColor: "rgba(21, 161, 255, 255)" });
  };

  const on_mouse_leave = () => {
    set_link({ textDecorationColor: "rgba(0, 0, 0, 0)" });
  };
  return (
    <animated.a
      href={p.project_link}
      target="_blank"
      onMouseEnter={on_mouse_enter}
      onMouseLeave={on_mouse_leave}
      className="project-title"
      style={anim as any} // XXX: Make sure to fix this after [this](https://github.com/react-spring/react-spring/issues/1102) is fixed
    >
      {p.project_name}
    </animated.a>
  );
};

interface ProjectCardProps {
  project: Project;
  cardw: number;
  cardh: number;
}

const ProjectCard = (p: ProjectCardProps) => {
  let tags = new Array(p.project.tags.length);

  for (const [i, tag] of p.project.tags.entries()) {
    tags.push(
      <span className="project-tag" key={i}>
        <div
          className="project-circle"
          style={{ backgroundColor: tag_color(tag) }}
        ></div>
        {tag as string}
      </span>
    );
  }

  let [anim, set_shadow] = useSpring(() => ({
    boxShadow: "0px 0px 0px #00000000",
  }));

  const on_mouse_enter = () => {
    set_shadow({ boxShadow: "2px 2px 4px #00000030" });
  };

  const on_mouse_leave = () => {
    set_shadow({ boxShadow: "0px 0px 0px #00000000" });
  };

  return (
    <animated.div
      className="project-card"
      style={{ width: p.cardw, height: p.cardh, ...(anim as any) }} // XXX: Make sure to fix this after [this](https://github.com/react-spring/react-spring/issues/1102) is fixed
      onMouseEnter={on_mouse_enter}
      onMouseLeave={on_mouse_leave}
    >
      <div className="project-tags">{tags}</div>

      <div className="project-texts">
        <ProjectCardLink
          project_name={p.project.display_name}
          project_link={p.project.link}
        ></ProjectCardLink>
        <div className="project-text">{p.project.description}</div>
      </div>
    </animated.div>
  );
};

interface ProjectGridProps {
  items: Array<Project>;
  visible: boolean;
}

interface ProjectPosition {
  xy: [number, number];
  project: Project;
}

const ProjectGrid = (p: ProjectGridProps) => {
  const [vwidth] = useWindowSize();
  const width = vwidth * 0.7;

  // Card width
  const cardw = 300;
  // Card height
  const cardh = 200;

  // Card width margin
  const cardwm = 20;
  // Card height margin
  const cardhm = 20;

  // Number of comlumns
  const approx_cols = Math.floor(width / cardw);
  const columns = Math.floor((width - cardwm * approx_cols) / cardw); // Account for margin after approximate cols

  let counter_col = 0;
  let counter_row = 0;
  let grid_items: Array<ProjectPosition> = p.items.map((child, i) => {
    counter_col++;

    if (i % columns === 0) {
      if (i !== 0) {
        // New row
        counter_row++;
      }
      // Reset column
      counter_col = 0;
    }

    return {
      xy: [(cardw + cardwm) * counter_col, counter_row * (cardh + cardhm)],
      project: child,
    };
  });

  counter_row += 1;

  const transitions = useTransition(grid_items, {
    from: () => ({ xy: [0, 0], width: cardw, height: cardh, opacity: 0 }),
    enter: ({ xy }) => ({
      xy: p.visible ? xy : [0, 0],
      width: cardw,
      height: cardh,
      opacity: p.visible ? 1 : 0,
    }),
    update: ({ xy }) => ({
      xy: p.visible ? xy : [0, 0],
      width: cardw,
      height: cardh,
      opacity: p.visible ? 1 : 0,
    }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    keys: (item: ProjectPosition) => item.project.rank,
  });

  const fragment = transitions((style: any, item: ProjectPosition) => {
    let { xy, ...others } = style;

    return (
      <animated.div
        key={item.project.rank}
        style={{
          position: "absolute",
          transform: xy.interpolate(
            (x: number, y: number) => `translate3d(${x}px, ${y}px, 0px)`
          ),
          ...others,
        }}
      >
        <ProjectCard
          project={item.project}
          cardh={cardh}
          cardw={cardw}
        ></ProjectCard>
      </animated.div>
    );
  });

  const [first_anim, set_first_anim] = useState(true);

  let spring_options: { from: undefined | object; to: object } = {
    from: undefined,
    to: {
      height: counter_row * (cardh + cardhm),
      width: columns * (cardw + cardwm),
    },
  };

  if (first_anim) {
    set_first_anim(false);
    spring_options.from = {
      height: counter_row * (cardh + cardhm),
      width: columns * (cardw + cardwm),
    };
  }

  const anims = useSpring(spring_options);

  return (
    <animated.div id="project-grid" style={{ display: "block", ...anims }}>
      {fragment}
    </animated.div>
  );
};

const Projects = () => {
  const [items] = useState(project_list);
  const [ref, visible] = useInView({
    triggerOnce: true,
  });

  return (
    <div id="projects-page">
      <div className="title" id="projects-title">
        My Projects
      </div>
      <div ref={ref}>
        <ProjectGrid items={items} visible={visible}></ProjectGrid>
      </div>
    </div>
  );
};

export default Projects;