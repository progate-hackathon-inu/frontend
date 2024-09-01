import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ManimAboutPage() {
  return (
    <div className='min-h-screen p-4 text-white'>
      <h1 className='text-3xl font-bold mb-4'>Manim について</h1>
      <p className='mb-8'>
        Manim（Mathematical Animation Engine）は、Pythonライブラリの一つで、
        数学的概念を視覚化するためのアニメーションを作成することができます。
        特に教育や研究で使用されることが多く、複雑な数式やグラフをアニメーションで
        わかりやすく表現するのに役立ちます。ManimTubeに投稿されている動画は、
        すべてManimが使われています。
      </p>

      <section id='quickstart' className='mb-8'>
        <h1 className='text-3xl font-bold mb-4'>Manim チュートリアル</h1>

        <section id='overview' className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>概要</h2>
          <p>
            このチュートリアルでは、サンプルプロジェクトでManimを使用したアニメーションを作成する手順を説明します。
          </p>
          <p className='mt-4'>
            公式のチュートリアルはこちらになります。ぜひ合わせてご確認ください。→
            <a
              href='https://docs.manim.community/en/stable/tutorials/index.html'
              className='text-green-500'
              style={{ textDecoration: 'underline' }}
              target='_blank'
              rel='noopener noreferrer'
            >
              Manim Community Tutorial
            </a>
          </p>
        </section>

        <h2 className='text-2xl font-bold mb-4'>新しいプロジェクトの開始</h2>
        <p>
          まず、新しいフォルダを作成します。このガイドでは、フォルダに次の名前を付けます{' '}
          <code>project</code>。このフォルダはプロジェクトのルートフォルダです。
          Manimが機能するために必要なすべてのファイルと、プロジェクトが生成するすべての出力が含まれます。
        </p>
      </section>

      <section id='example1' className='mb-8'>
        <h2 className='text-xl font-bold mb-4'>Example 1: 円をアニメーション化する</h2>
        <p>この例では、Manimを使って基本的な円のアニメーションを作成する方法を紹介します。</p>
        <SyntaxHighlighter language='python' style={dark} className='mt-4 rounded'>
          {`from manim import *

class CreateCircle(Scene):
    def construct(self):
        circle = Circle()  # create a circle
        circle.set_fill(PINK, opacity=0.5)  # set the color and transparency
        self.play(Create(circle))  # show the circle on screen`}
        </SyntaxHighlighter>
        <p className='mt-4'>
          上記のコードを <code>scene.py</code>{' '}
          という名前でプロジェクトフォルダに保存し、以下のコマンドを実行してアニメーションを生成します。
        </p>
        <SyntaxHighlighter language='bash' style={dark} className='mt-4 rounded'>
          {`manim -pql scene.py CreateCircle`}
        </SyntaxHighlighter>
        <p className='mt-4'>
          このコマンドは、Manimがレンダリング情報を出力し、MP4ファイルを作成します。デフォルトのムービープレーヤーでMP4ファイルが再生され、アニメーションが表示されます。
        </p>
        <video controls className='mt-4' style={{ maxWidth: '600px', maxHeight: '400px' }}>
          <source src='/create_circle.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <p className='mt-4'>
          ピンク色の円が描かれるアニメーションが表示されたら、成功です。Manimアニメーションを0から作成することができました！
        </p>
      </section>

      <section id='explanation' className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>説明</h2>
        <p>
          先ほど実行したスクリプトを1行ずつ確認して、Manimがどのようにして円を描画できたかを確認しましょう。
        </p>
        <p className='mt-4'>最初の行はライブラリのすべての内容をインポートします。</p>
        <SyntaxHighlighter language='python' style={dark} className='mt-4 rounded'>
          {`from manim import *`}
        </SyntaxHighlighter>
        <p className='mt-4'>
          これは、Manimを使用するための推奨される方法です。単一のスクリプトでManimの名前空間から複数の名前が使用されることが多いためです。
          スクリプトでは、Sceneクラスを継承して、CircleオブジェクトとPINKの色を使ってCreateメソッドでアニメーションを作成します。
        </p>

        <p className='mt-4'>それでは次の2行を見てみましょう。</p>
        <SyntaxHighlighter language='python' style={dark} className='mt-4 rounded'>
          {`class CreateCircle(Scene):
    def construct(self):
        [...]`}
        </SyntaxHighlighter>

        <p className='mt-4'>
          ほとんどの場合、アニメーションのスクリプトを作成するコードは、Sceneクラスのconstruct()メソッド内に完全に含まれています。construct()メソッド内では、オブジェクトを作成し、画面に表示し、アニメーション化することができます。
        </p>
        <p className='mt-4'>次の2行は円を作成し、その色と不透明度を設定します。</p>
        <SyntaxHighlighter language='python' style={dark} className='mt-4 rounded'>
          {`circle = Circle()  # create a circle
    circle.set_fill(PINK, opacity=0.5)  # set the color and transparency`}
        </SyntaxHighlighter>

        <p className='mt-4'>最後に、Createメソッドを使用して画面上に円を表示します。</p>
        <SyntaxHighlighter language='python' style={dark} className='mt-4 rounded'>
          {`self.play(Create(circle))  # show the circle on screen`}
        </SyntaxHighlighter>

        <p className='mt-4'>
          <strong>ヒント:</strong>{' '}
          すべてのアニメーションは、Sceneクラスを継承したクラスのconstruct()メソッド内に存在する必要があります。補助関数や数学関数などのその他のコードは、クラスの外部に存在することができます。
        </p>
      </section>
      <section id='conclusion' className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>お疲れ様でした</h2>
        <p className='mb-4'>
          Manimのチュートリアルは以上となります。ManimTubeでは、アルゴリズムについて分かりやすく学べる動画が投稿されています。
          ぜひご活用ください。
        </p>
      </section>
    </div>
  )
}
