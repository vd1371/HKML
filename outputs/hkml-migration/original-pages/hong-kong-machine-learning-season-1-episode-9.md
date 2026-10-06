# Hong Kong Machine Learning Season 1 Episode 9

Original: https://www.hkml.ai/2019/04/hong-kong-machine-learning-season-1-episode-9/

When?

Wednesday, April 17, 2019 from 7:00 PM to 9:00 PM

Where?

TusParkHK Innovation Hub, 118 Wai Yip Street, Kwun Tong, Hong Kong
[TusParkHK Innovation Hub](https://www.tuspark.com.hk/)

This meetup was hosted by TusParkHK Innovation Hub. A few pictures taken at their Kwun Tong location. Thanks to Gary Ng and his deepteck community for the lead.
[TusParkHK Innovation Hub](https://www.tuspark.com.hk/)
[pictures](https://www.linkedin.com/feed/update/urn:li:activity:6524794865593737216)
[Gary Ng](https://www.linkedin.com/in/garyckng/)
[deepteck community](https://www.deepteck.com/)

## Programme:

Note that, as usual, errors and approximations in the summaries below are mine. Especially this time as my understanding of biology is unfortunately rather low.

Robert Milan Porsch - Estimating Genetic Risks of Common Phenotypes
[Robert Milan Porsch](https://www.linkedin.com/in/robert-milan-porsch-376705123/)

Robert’s talk was about using machine learning in a specific area of biology: estimating genetic risks of common phenotypes using data from the human genome (obtained either through microarray or sequencing techniques). The results of the predictive models obtained have usually a very low R-squared (5 to 10%). Alike in quant finance, this type of biological regressions suffer many similar problems (as noticed by Igor Tulchinsky, and reflected in the partnership he created between WorldQuant and a computational biology lab; cf. the short review I wrote about his book):
[phenotypes](https://en.wikipedia.org/wiki/Phenotype)
[the short review I wrote about his book](http://marti.ai/quant/2018/10/16/book-the-unrules.html)

not enough power/sample size,

presents non-linear effects,

many interactions,

rare variants.

Finally, Robert shares his attempts at applying neural networks on raw genetic data.

Robert’s slides can be found there.
[there](https://drive.google.com/file/d/1EXrLuJUGU0t3J_rYD20DCgPCcrL5WAJU/view?usp=sharing)

KaHei Chan - Discovery of Biological Systems with GWAS on Omics Data
[KaHei Chan](https://www.linkedin.com/in/kahei-chan-1940b3b2/)

KaHei presented a computational approach to the discovery of biological systems using genome-wide association study. Related to Machine Learning, since ML models are hard to interpret, they are not use for final predictions but more to study feature importance: Regression is an auxiliary task whose purpose is to provide a ranking of the most important features.
[genome-wide association study](https://en.wikipedia.org/wiki/Genome-wide_association_study)

Rohit Apte - RNNs and Sequence to Sequence models
[Rohit Apte](https://www.linkedin.com/in/rohit-apte-554a262/)

Rohit presented very pedagogically the neural networks used for machine translation. He started from vanilla neural networks and their limitations to deal with sequences (hence not suited for machine translation), to recurrent neural networks and their limitations to deal with output sequences whose length differs from input sequences (hence not suited for machine translation), and finally to “sequence to sequence” (seq2seq) models, which were later enhanced by the concept of attention. Original sequence to sequence models basically encode all the sequence information in an intermediate (called thought/sense) vector which is the final state of the encoder part of the model, then the decoder part unfolds the information contained in this thought vector into an output sequence whose length can be different than the input sequence. One drawback of this model is that the entire information of the input sequence is compressed into the intermediate vector, and it can be rather tricky/inefficient for the decoder to pick the relevant information into its coordinates. The conception of attention has been developed so that the decoder can leverages previous hidden state of the encoder part: It can combine the previous states by attributing them weights (attention) such that the weighted sum of these hidden state vectors is more informative than a mere final state (in terms of achieving a lower training/validation/testing error). Finally, attention provides a simple way to “understand”/visualize what is going on in the network. It is, of course, an oversimplication as the network is much more complex than its attention component. It gives however cues that make sense.

Rohit noticed that over the last couple of months, it has become easier and easier to play with these advanced models as the open source libraries rolled out by the big tech companies provide now very high level APIs to train/use these models.

Rohit’s slides can be found there.
[there](https://drive.google.com/file/d/1JFVjRq_YqtMw1b6L5YjCOC77KBI9g38u/view?usp=sharing)
