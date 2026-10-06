# Hong Kong Machine Learning Season 2 Episode 5

Original: https://www.hkml.ai/2020/04/hong-kong-machine-learning-season-2-episode-5/

When?

Wednesday, April 29, 2020 from 7:00 PM to 9:00 PM

Where?

At your home, on zoom. All meetups will be online as long as this COVID-19 crisis is not over.
[zoom](https://zoom.us/)

Thanks to our patrons for supporting the meetup!

Check the patreon page to join the current list:
[Check the patreon page](https://www.patreon.com/hkml?fan_landing=true)

Tomas Thornquist
[Tomas Thornquist](https://www.linkedin.com/in/tomas-thornquist-060a43122/)

## Programme:

Robert Milan Porsch (Data Scientist at Apoidea) - Numeracy understanding in language models
[Robert Milan Porsch](https://www.linkedin.com/in/robert-milan-porsch-376705123/)
[Apoidea](https://www.apoidea.ai/)

Robert gave an introduction to numeracy understanding in language models, a nascent field of research. You can find his presentation slides here.
[here](https://drive.google.com/file/d/1Xjy_pyz7fzQh6OPXL6X7LFd4QLnjJA6R/view?usp=sharing)

Summary from Robert

Numeracy understanding in language models is an often overlooked subject in natural language processing. Nevertheless, while most language models have some innate understanding of numeracy they often fail to extrapolate outside their original training range as well as have troubles with larger numbers. More recently a few specialised models have been developed in order to perform numerical reasoning over a given text. Impressively, these models perform rather well on the DROP data set, a benchmark set in which a system must resolve references in a question and perform discrete operations over them (such as addition, counting, or sorting). However, most of these SOTA models have troubles to generalize and it is often not trivial to extend these existing models with additional arithmetic operations.

Personal takeaways

The problem of numeracy understanding in natural language processing is an obviously important one for the industry (e.g. automated processing of bills, account statements, reconciliation of cash flows, and so many other use cases).

The problem is far from being solved, and, until recently, not studied in academia.

One would like to have a basic understanding of numbers embedded in the modern language models. For example, these models should be able

to compare numbers (e.g. one number is smaller than the other one, the two numbers are roughly equal in the context),

to recognize that there are several ways to write the same number (e.g. 3, three)

to perform basic arithmetic

Using typical modern language models (e.g. ELMo, BERT, Char-CNN, Char-LSTM, Word2Vec), what is the current performance in numeracy?

Robert highlighted results from Do NLP Models Know Numbers? Probing Numeracy in Embeddings.
[Do NLP Models Know Numbers? Probing Numeracy in Embeddings](https://arxiv.org/pdf/1909.07940.pdf)

In short, and sadly, not really (for now).

They tend to memorize and can yield near perfect results (on some tasks such as those listed above), but they don’t generalize well to unseen numbers (especially of different order of magnitude).

Robert also pointed to this very recent paper: Injecting Numerical Reasoning Skills into Language Models, which uses automatic data generation to pre-train the language models. Concretely, one can easily and automatically feed the language models with tons of, say, basic computations such as (Question: 5 + 8 - 3, Answer: 10).
[Injecting Numerical Reasoning Skills into Language Models](https://arxiv.org/pdf/2004.04487.pdf)

This approach seems quite naive to me, but the paper claims it helps. Would need to investigate more, and study the embeddings to understand what they capture. Can they really generalize or are they ‘overfitted’ to perform on the DROP dataset (in a similar way top Q&A models were somewhat overfitted to the SQuAD dataset)?
[DROP dataset](https://allennlp.org/drop)
[SQuAD](https://rajpurkar.github.io/SQuAD-explorer/)

Without knowing much of the details of the model yet, one thing that strikes me with this data generation is that a priori the language model won’t be data efficient at all, and so would require so much more data than what can be easily automatically generated. Consider the sum example: a + b + c + d = e, there is 4! = 1 * 2 * 3 * 4 = 24 ways of writing this sum, and all of these n! permutations will be consider a priori different inputs by the model. So, naively, the problem dimension is very (too) high with respect to the number of samples… still worth trying. In this specific case, adding some permutation invariance module in the language model could help (cf. my remarks on permutation invariance in neural networks).
[my remarks](http://marti.ai/ml/2019/09/01/correl-invariance-permutations-nn.html)

One question from the audience was that maybe deep learning / modern language models are not the most appropriate tool for these tasks. Could be. However, I feel that in this case we want a fuzzy understanding of numbers rather than an arithmetic machine or perfect information extraction system; more like a common sense understanding that is dependent on context. Is 5 ~= 5.4? Depends on context (which is given in natural language).

As a last thought on this topic, numeracy understanding in language models could also be strongly depending on the language. I did this small experiment some time ago about converting numbers from their natural language representation to their digit (base 10) representation. Conclusion: In some languages (e.g. Chinese or French) it is easier for a seq2seq model to learn how to convert from one representation to the other than for some other languages (e.g. Malay or English). Representations which require more than simple pattern recognition (and possibly memorization) but a bit of arithmetic (additions and multiplications) couldn’t be translated (e.g. hexademical (base 16) to decimal (base 10)).
[experiment some time ago about converting numbers from their natural language representation to their digit (base 10) representation](http://marti.ai/deep-learning/2018/06/25/seq2seq-number-translation.html)
[seq2seq](https://en.wikipedia.org/wiki/Seq2seq)

Emmanuel Rialland - An introduction to Julia for Data Science and Machine Learning
[Emmanuel Rialland](https://www.linkedin.com/in/emmanuelrialland/)
[Julia](https://julialang.org/)

All the material associated with Emmanuel’s presentation can be found on his GitHub, or if you just want to have a quick look at the pdf of the presentation, it’s here.
[GitHub](https://github.com/Emmanuel-R8/Presentation_HKML_2020_04)
[here](https://drive.google.com/file/d/11ToCVHi4T6dLlRigAvYON98lV23BBR6p/view?usp=sharing)

Summary

Lots of interesting pointers in this presentation to dig out further. Broadly, they can be subdivided in two categories,

targetting a ML/Science crowd:

SciML: Open Source Software for Scientific Machine Learning
[SciML: Open Source Software for Scientific Machine Learning](https://sciml.ai/)

Flux, a library to write deep neural networks, and more (differentiable programming with Zygote - but What Is Differentiable Programming?)
[Flux](https://fluxml.ai/)
[Zygote](https://fluxml.ai/Zygote.jl/latest/)
[What Is Differentiable Programming?](https://fluxml.ai/2019/02/07/what-is-differentiable-programming.html)

targetting a programming/CS crowd:

The Unreasonable Effectiveness of Multiple Dispatch by Stefan Karpinski
[The Unreasonable Effectiveness of Multiple Dispatch by Stefan Karpinski](https://www.youtube.com/watch?v=kc9HwsxE1OY)

Performance benchmarks: can be as fast as C…
[Performance benchmarks](https://julialang.org/benchmarks/)

…notably by using LoopVectorization.jl
[LoopVectorization.jl](https://chriselrod.github.io/LoopVectorization.jl/latest/getting_started/)

Julia is compiled using LLVM
[LLVM](https://en.wikipedia.org/wiki/LLVM)

Could Julia take over Python for being the mainstream machine learning language?

As of now, it feels to me that it still lacks a broad ecosystem to be ready-to-use for robust and fast industry deployments compared to Python, but compelling for research. But, I could be wrong (cf. these real world Julia case studies), I will definitely explore more…
[these real world Julia case studies](https://juliacomputing.com/case-studies/)
