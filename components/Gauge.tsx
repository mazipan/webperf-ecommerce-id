import React from 'react';

const BASE_DASH_ARRAY = 352;

const svgWrapper = (size: string): any => {
  const h = size === 'large' ? '120px' : '60px';
  return {
    position: 'relative',
    height: h,
  };
};

const svg = (size: string) => {
  const h = size === 'large' ? '120px' : '60px';

  return {
    strokeLinecap: 'round',
    height: h,
    width: h,
  };
};

const textPercentage = (size: string) => {
  const h = size === 'large' ? '120px' : '60px';
  const f = size === 'large' ? `${120 * 0.34 + 1.3}px` : `${60 * 0.34 + 1.3}px`;
  const t = size === 'large' ? `${8 + 120 / 2}px` : `${8 + 60 / 2}px`;

  return {
    width: '100%',
    height: h,
    position: 'absolute',
    fontSize: f,
    lineHeight: 0,
    textAlign: 'center',
    top: t,
  };
};

const ScoreChart = ({ score = 0, variant = 'large' }): React.ReactElement => {
  const dashArray = Math.floor(BASE_DASH_ARRAY * score);
  const scoreIndex = Math.round(score * 100);

  const getClassStrokeByScore = (scoreLocal) => {
    if (scoreLocal < 0.5) {
      return 'stroke--slow';
    }
    if (scoreLocal < 0.9) {
      return 'stroke--avg';
    }
    return 'stroke--fast';
  };

  const getClassByScore = (scoreLocal) => {
    if (scoreLocal < 0.5) {
      return 'is--slow';
    }
    if (scoreLocal < 0.9) {
      return 'is--avg';
    }
    return 'is--fast';
  };

  return (
    <div className={`lh-gauge__wrapper ${getClassByScore(score)}`}>
      <div style={svgWrapper(variant)}>
        {/* lol https://github.com/Microsoft/TypeScript/issues/27552#issuecomment-495830020
			// @ts-ignore */ /* prettier-ignore */}
        <svg viewBox="0 0 120 120" style={svg(variant)}>
          <circle r="56" cx="60" cy="60" className={`svg-circle ${getClassStrokeByScore(score)}`} />
          <circle
            className={`svg-circle__arc ${getClassStrokeByScore(score)}`}
            transform="rotate(-90 60 60)"
            r="56"
            cx="60"
            cy="60"
            style={{ strokeDasharray: `${dashArray}, 352` }}
          />
        </svg>
      </div>
      {/* lol https://github.com/Microsoft/TypeScript/issues/27552#issuecomment-495830020
			// @ts-ignore */ /* prettier-ignore */}
      <div style={textPercentage(variant)}>{scoreIndex}</div>
    </div>
  );
};

export default ScoreChart;
