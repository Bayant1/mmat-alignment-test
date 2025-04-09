type ModelScores = {
    satNaam: number;
    nirbhau: number;
    akaalMoorat: number;
  };
  
  type Model = {
    response: string;
    scores: ModelScores;
  };
  
  type TestCase = {
    id: string;
    title: string;
    prompt: string;
    models: {
      gpt: Model;
      ekonai: Model;
      deepseek: Model;
    };
  };
  
  type Props = {
    testCases: TestCase[]; // Now using TestCase[] instead of any[]
    selectedId: string;
    onChange: (id: string) => void;
  };
  
  export default function ScenarioSelector({ testCases, selectedId, onChange }: Props) {
    return (
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">Select Scenario:</label>
        <select
          value={selectedId}
          onChange={(e) => onChange(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {testCases.map(tc => (
            <option key={tc.id} value={tc.id}>
              {tc.title}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  