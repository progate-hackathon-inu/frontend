import React from 'react'

interface Step {
  title: string
  description: string
  subSteps?: string[]
}

interface AlgorithmData {
  title: string
  overview: string
  detailedExplanation: string
  steps: Step[]
  codeExample: string
  timeComplexity: string
  spaceComplexity: string
  additionalNotes: string[]
}

const algorithmData: AlgorithmData = {
  title: 'クイックソートアルゴリズム',
  overview:
    'クイックソートは効率的で広く使用されている比較ベースのソートアルゴリズムです。分割統治法を用いて大きな問題を小さな問題に分解し、再帰的に解決します。',
  detailedExplanation:
    'クイックソートは、リストから「ピボット」要素を選び、それより小さい要素を左に、大きい要素を右に分割することで動作します。この過程を再帰的に繰り返すことで、最終的にソートされたリストが得られます。平均的なケースでは非常に効率的ですが、最悪のケースでは性能が低下する可能性があります。',
  steps: [
    {
      title: 'ピボットの選択',
      description:
        'リストから1つの要素をピボットとして選びます。一般的には、最初、最後、またはランダムな要素が選ばれます。',
    },
    {
      title: 'パーティション',
      description:
        'ピボットを基準にリストを2つの部分に分割します。ピボットより小さい要素を左に、大きい要素を右に移動させます。',
      subSteps: [
        '左端から順に、ピボットより大きい要素を探します。',
        '右端から順に、ピボットより小さい要素を探します。',
        'これらの要素を交換します。',
        'ポインタが交差するまで、このプロセスを繰り返します。',
      ],
    },
    {
      title: '再帰的な適用',
      description:
        'パーティションの左側と右側のサブリストに対して、同じプロセスを再帰的に適用します。',
    },
    {
      title: '結合',
      description: 'すべての再帰呼び出しが完了すると、リスト全体がソートされた状態になります。',
    },
  ],
  codeExample: `
function quickSort(arr: number[], low: number, high: number): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
  `,
  timeComplexity: '平均ケース: O(n log n), 最悪ケース: O(n^2',
  spaceComplexity: 'O(log n)',
  additionalNotes: [
    'クイックソートは、リストの長さが n の場合、平均時間計算量が O(n log n) であるため、効率的です。',
    'しかし、最悪のケースでは、リストが順の場合、時間計算量は O(n^2) になります。',
    'クイックソートは、リストの長さが小さい場合、他のソートアルゴリズムよりも効率的です。',
  ],
}

const Article: React.FC = () => {
  return (
    <div className='bg-gray-800 p-6 rounded-lg'>
      <h3 className='text-2xl font-semibold mb-6'>{algorithmData.title}</h3>
      <div className='prose prose-invert prose-lg max-h-[70vh] overflow-y-auto pr-4'>
        <h4 className='text-xl font-medium mb-3'>概要</h4>
        <p className='mb-4'>{algorithmData.overview}</p>
        <h4 className='text-xl font-medium mt-6 mb-3'>詳細な説明</h4>
        <p className='mb-4'>{algorithmData.detailedExplanation}</p>
        <h4 className='text-xl font-medium mt-6 mb-3'>主要なステップ</h4>
        <ol className='list-decimal list-inside space-y-2'>
          {algorithmData.steps.map((step, index) => (
            <li key={index}>
              <h5 className='font-medium mb-2'>{step.title}</h5>
              <p className='mb-4'>{step.description}</p>
              {step.subSteps && (
                <ul className='list-disc list-inside space-y-2'>
                  {step.subSteps.map((subStep, subIndex) => (
                    <li key={subIndex}>{subStep}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
        <h4 className='text-xl font-medium mt-6 mb-3'>コード例</h4>
        <pre className='bg-gray-900 p-4 rounded'>
          <code className='text-sm'>{algorithmData.codeExample}</code>
        </pre>
        <h4 className='text-xl font-medium mt-6 mb-3'>時間計算量</h4>
        <p className='mb-4'>{algorithmData.timeComplexity}</p>
        <h4 className='text-xl font-medium mt-6 mb-3'>空間計算量</h4>
        <p className='mb-4'>{algorithmData.spaceComplexity}</p>
        <h4 className='text-xl font-medium mt-6 mb-3'>追加の注記</h4>
        <ul className='list-disc list-inside space-y-2'>
          {algorithmData.additionalNotes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Article
