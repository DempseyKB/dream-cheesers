import Markdown from 'markdown-to-jsx';
import { Stats as StatsType, StatItem as StatItemType } from '../types/contentful';

const themeClassMap = {
  primary: 'bg-purple-700 text-white',
  dark: 'bg-gray-800 text-white',
};

interface StatsProps extends StatsType {}

export const Stats: React.FC<StatsProps> = (props) => {
  return (
    <div
      className={`px-6 py-16 text-center ${themeClassMap[props.theme || 'primary']} sm:px-12 sm:py-24`}
    >
      <div className="mx-auto">
        <div className="mb-16">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            {props.heading}
          </h2>
          {props.body && (
            <Markdown options={{ forceBlock: true }} className="sm:text-lg">
              {props.body}
            </Markdown>
          )}
        </div>
        <div className="grid max-w-3xl gap-12 mx-auto sm:grid-cols-3">
          {(props.stats || []).map((stat, idx) => <StatItem key={idx} {...stat} />)}
        </div>
      </div>
    </div>
  );
};

interface StatItemProps extends StatItemType {}

const StatItem: React.FC<StatItemProps> = (props) => {
  return (
    <div>
      <div className="mb-3 text-4xl font-bold sm:text-5xl">
        {props.value}
      </div>
      <div>{props.label}</div>
    </div>
  );
};
