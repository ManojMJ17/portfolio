'use client';

import { useInView } from '@/lib/useInView';
import type { Project } from '@/data/types';

type VideoFrame = {
  container: string;
  wrapper: string;
  video: string;
};

type ProjectVideoProps = {
  project: Project;
  frame: VideoFrame;
};

// Renders only the background still until ~30% of the card is on screen,
// then mounts the <video> so autoplay kicks in — keeps the initial page
// load from downloading every project's clip up front.
const ProjectVideo = ({ project, frame }: ProjectVideoProps) => {
  const { ref, inView } = useInView<HTMLAnchorElement>({ threshold: 0.3 });

  return (
    <a
      ref={ref}
      href={project.href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`View ${project.title} project`}
      className={frame.container}
    >
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30'
        style={{ backgroundImage: `url(${project.img})` }}
      />
      {inView && (
        <div className={frame.wrapper}>
          <video
            src={project.video}
            className={frame.video}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      )}
    </a>
  );
};

export default ProjectVideo;
