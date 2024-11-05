'use client';

const HeadlineBulletPoint = ({colour}: {colour: string}) => {

  return (
    <div className={`w-4 h-4 ${colour ? `bg-[${colour}]` : ''}`} />
  );
};

export default HeadlineBulletPoint;
