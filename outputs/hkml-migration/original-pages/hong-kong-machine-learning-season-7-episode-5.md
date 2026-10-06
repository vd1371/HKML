# Hong Kong Machine Learning Season 7 Episode 5

Original: https://www.hkml.ai/2025/12/hong-kong-machine-learning-season-7-episode-5/

When?

Thursday, December 18, 2025 from 6:30 PM to 9:00 PM (Hong Kong Time)

Where?

Bullish Limited, 31/F, The Centrium, 60 Wyndham St, Central, Hong Kong

The page of the event on Meetup: HKML S7E5.
[HKML S7E5](https://www.meetup.com/hong-kong-machine-learning-meetup/events/312257029/)

This event was organised by Vahid Asghari, with the support of Bullish.
[Vahid Asghari](https://www.linkedin.com/in/asgharivahid/)
[Bullish](https://www.bullish.com/)

## Programme:

Our final Hong Kong Machine Learning Meetup of the year brought together builders from Web3, quantitative finance, and natural language processing, showcasing how machine learning continues to reshape industries in very different ways.

This exclusive, invite-only event was proudly hosted in cooperation with Bullish, whom we thank sincerely for their generous support and venue.

Talk 1: Unchaining Creators by Moving the Creator Economy On-Chain

Sébastien Borget, Co-Founder and COO of The Sandbox, opened the evening with a compelling vision for the future of the creator economy. Drawing from over a decade of experience in user-generated content, gaming, and blockchain, Sébastien explained how creators today remain constrained by fragmented identities, opaque algorithms, and unsustainable monetization models, even on modern platforms.

Key Insights:

Creators lack portable identity: followers, reputation, and economic history are locked inside platforms.

Algorithms cap growth rather than reward participation.

Fans cannot co-own success, limiting long-term engagement.

To address this, Sébastien introduced SANDchain, positioned as the financial backbone of creativity. Rather than forcing creators to abandon existing platforms, SANDchain adds an on-chain layer that enables:

Portable creator identity

On-chain loyalty points (SANDpoints & Creator Points)

Community-driven growth instead of algorithmic reach

Sustainable creator economies backed by $SAND liquidity

The talk outlined a full ecosystem: creator vaults, tokens paired with $SAND, loyalty-driven governance, and transparent capital flows — all designed to let creators and fans win together over the long term.

Short bio: Sébastien Borget is an entrepreneur and father with 14 years of experience in growing startups, including 4 years in blockchain and 11 years in mobile gaming. He is the Co-founder and COO of The Sandbox, a pioneering virtual world where players build, own, and monetize gaming experiences using NFTs and SAND, the platform’s utility token. In 2020, he became President of the Blockchain Game Alliance, representing over 250 industry leaders. Recognized among CoinTelegraph’s Top 100 most influential people in crypto, Sébastien holds a Computer Science Engineering degree from Telecom SudParis, one of France’s leading ICT graduate schools.

Slides
[Slides](https://docs.google.com/presentation/d/1rMpVtlI86__TMfDzNSvrhXsCicxJRhwv/edit?usp=share_link&ouid=111200802813018715040&rtpof=true&sd=true)

Talk 2: Accelerating Equity Exotics RFQ Response Times Using Machine Learning

Olaf Torne, Head of APAC Front-Office Equity Derivatives Quant at Barclays, delivered a highly practical talk on using ML-driven optimization to solve real trading bottlenecks.

In structured products trading, clients often request customized baskets involving complex payoffs. However, brute-force pricing is computationally infeasible, with millions of possible basket combinations and Monte Carlo pricing taking seconds per evaluation.

Problem Highlight

Selecting the optimal basket from hundreds of millions of combinations

Pricing each basket with traditional methods is too slow for RFQ timelines

ML-Driven Solution

Olaf presented a hybrid approach combining:

Fast basket bulk-pricing

Shared Monte Carlo paths

Reduced paths that preserve relative ordering

Parallelized pricing

Simulated Annealing optimization

Iteratively learns asset selection probabilities

Balances exploration vs exploitation

Converges using only ~0.2–0.3% of all possible baskets

The result: orders-of-magnitude speedups, allowing desks to respond competitively while maintaining pricing accuracy.

This talk was a strong example of machine learning augmenting, not replacing, classical quantitative finance.

Short bio: Olaf Torne leads the APAC front-office equity derivatives quant team at Barclays, with over 15 years of experience in quantitative finance spanning flow and exotic derivatives and quantitative investment strategies (QIS). Holding a PhD in mathematics from Brussels University and a graduate certificate in artificial intelligence from Stanford University, he combines classical modeling with machine learning to tackle complex financial challenges. His career includes roles at Merrill Lynch and research collaboration at Ecole Centrale Paris, where he published academic papers and built advanced models. As a team leader, he values collaboration, integrity, and innovation, mentoring others to drive excellence and impact.

Slides
[Slides](https://drive.google.com/file/d/1cSv5kpmInJnebqphMcmoJVnNJVz6SaI5/view?usp=share_link)

Talk 3: Enhancing LLMs’ Phonological Reasoning in Chinese via Fine-Tuning and Reinforcement Learning

Closing the evening, MA Jianfei (PhD student at PolyU) delivered a technically rich talk on Chinese phonological reasoning in large language models.

Chinese presents unique NLP challenges due to:

Extremely high homophone density

Complex tone systems

Frequent real-world usage of phonetic wordplay (puns, censorship circumvention, ASR errors)

Core Problem

While LLMs possess latent phonological knowledge, they often fail to:

Identify the correct homophonic target

Convert Chinese characters reliably to pinyin

Generate diverse and context-appropriate phonetic alternatives

Proposed Framework

Jianfei introduced a hierarchical training framework combining:

Subtasks: word-to-pinyin, phonetic similarity, contextual selection

Synthetic Chain-of-Thought data

Stabilizes reasoning steps

Improves robustness in real-world noisy scenarios

Results

A 7B model achieved performance comparable to much larger (~72B) teacher models

Demonstrated that linguistic structure + targeted data can outperform scale alone

Established one of the first synthetic datasets for Chinese phonological ambiguity

This talk sparked strong discussion around interpretability, linguistics, and the future role of domain experts in LLM development.

Short bio: MA Jianfei holds a BA in Translation and Linguistics from The Hong Kong Polytechnic University （PolyU） and is currently a first-year Ph.D. student there. His research interests lie in computational linguistics. Under his supervisor’s guidance, he is currently working on speech disorders in autism, with future plans to explore AI for therapy. He is currently including one first-author EMNLP (oral) and one ACL (oral, second author), alongside three workshop papers. His work primarily focuses on analyzing linguistic phenomena within model mechanisms （interpretability） and leveraging these phenomena to enhance model performance.

Slides
[Slides](https://drive.google.com/file/d/10y7FyvLEOwyWXMEDpg5-NCgyfiA9HFC1/view?usp=share_link)

Closing Thoughts

A big thank you again to Bullish, our speakers, and everyone who joined us. See you at the next HKML meetup. 🚀
