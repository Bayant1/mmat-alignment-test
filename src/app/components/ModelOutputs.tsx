import { useEffect, useState } from 'react';

interface Model {
  name: string;
  response: string;
  scores: {
    satNaam: number;
    nirbhau: number;
    akaalMoorat: number;
  };
}

export default function ModelOutputs({ models }: { models: Model[] }) {
  const [displayedResponses, setDisplayedResponses] = useState<string[]>([]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []; // Changed from 'let' to 'const'
    const newDisplayed: string[] = Array(models.length).fill('');
    setDisplayedResponses(newDisplayed);

    models.forEach((model, index) => {
      let i = 0;

      const type = () => {
        if (i <= model.response.length) {
          newDisplayed[index] = model.response.slice(0, i);
          setDisplayedResponses([...newDisplayed]);
          i++;
          const delay = Math.random() * (120 - 60) + 60;
          timeouts.push(setTimeout(type, delay));
        }
      };

      type();
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [models]);

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {models.map((model, index) => (
        <div
          key={model.name}
          className="bg-white/80 p-4 rounded-xl shadow-md backdrop-blur-sm border border-gray-200"
        >
          <h4 className="font-bold text-lg mb-2 flex items-center">
            {model.name}
            <div
              className="w-4 h-4 ml-2 rounded-full"
              style={{
                backgroundColor: model.name === 'gpt'
                  ? '#6366F1'
                  : model.name === 'ekonai'
                  ? '#10B981'
                  : '#F59E0B',
              }}
            ></div>
          </h4>
          <p className="whitespace-pre-line text-gray-700 min-h-[100px]">
            {displayedResponses[index]}
            <span className="animate-pulse inline-block w-2 ml-1 bg-gray-400 h-5 rounded-sm" />
          </p>
        </div>
      ))}
    </div>
  );
}




