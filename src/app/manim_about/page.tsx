import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ManimAboutPage() {
  return (
    <div className='min-h-screen p-4 text-white'>
      <h1 className='text-3xl font-bold mb-4'>Manimについて</h1>
      <p className='mb-8'>
        Manim（Mathematical Animation
        Engine）は、Pythonライブラリの一つで、数学的概念を視覚化するためのアニメーションを作成することができます。
        特に教育や研究で使用されることが多く、複雑な数式やグラフをアニメーションでわかりやすく表現するのに役立ちます。
        ManimTubeに投稿されている動画は、すべてManimが使われています。
      </p>

      <section id='example1' className='mb-8'>
        <h1 className='text-3xl font-bold mb-4'>Manimの使用例</h1>
        <h2 className='text-xl font-bold'>Example 1: Basic Animation</h2>
        <p>この例では、Manimを使った基本的なアニメーションを紹介します。</p>
        <video controls className='mt-4'>
          <source src='path_to_video.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <SyntaxHighlighter language='python' style={dark} className='mt-4 rounded'>
          {`from manim import *

class BasicScene(Scene):
    def construct(self):
        text = Text("Hello, Manim!")
        self.play(Write(text))
        self.play(text.animate.shift(UP))
        self.play(FadeOut(text))`}
        </SyntaxHighlighter>
      </section>

      <section id='example2'>
        <h2 className='text-xl font-bold'>Example 2: Graph Plotting</h2>
        <p>この例では、Manimを使ってグラフをプロットする方法を紹介します。</p>
        <video controls className='mt-4'>
          <source src='path_to_video.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <SyntaxHighlighter language='python' style={dark} className='mt-4 rounded'>
          {`from manim import *

class GraphPlot(Scene):
    def construct(self):
        axes = Axes(x_range=(-3, 3), y_range=(-2, 2))
        graph = axes.plot(lambda x: x**2, color=WHITE)
        self.play(Create(axes), Create(graph))`}
        </SyntaxHighlighter>
      </section>
    </div>
  )
}
