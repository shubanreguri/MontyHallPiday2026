The Monty Hall Problem
An Interactive Probability Game
Next.js 16  ·  React 19  ·  TypeScript  ·  Tailwind CSS
1. Overview
This repository contains a fully interactive, web-based simulation of the Monty Hall Problem — one of the most famous and counterintuitive puzzles in probability theory. Built with Next.js 16 and React 19, the application lets users play the game manually, observe the outcomes, and develop an intuition for why the mathematically correct strategy (always switching) is so surprising to human intuition.

The game faithfully replicates the original television game show scenario: three doors, one prize (a car), two goats, a host who always reveals a goat, and a final decision to stay or switch.

2. The Monty Hall Problem
2.1  Historical Background
The problem takes its name from Monty Hall, the long-running host of the American television game show Let's Make a Deal, which aired from 1963 onwards. The puzzle was formally posed in 1990 by Marilyn vos Savant in her Parade magazine column, where she correctly stated that contestants should always switch doors. Her answer provoked one of the largest public mathematical controversies in modern history — thousands of readers, including many professional mathematicians and statisticians, wrote in to insist she was wrong. She was not.

The problem has since become a cornerstone example in probability theory, cognitive psychology, and Bayesian reasoning, illustrating how human intuition systematically fails when confronted with conditional probability.
2.2  The Setup
The scenario is precisely defined as follows:
1.	There are three doors. Behind one is a car (the prize). Behind the other two are goats.
2.	The contestant picks one door (not yet opened).
3.	The host — who knows what is behind every door — opens one of the other two doors, always revealing a goat. The host will never open the door the contestant chose, and will never reveal the car.
4.	The contestant is then offered a choice: stick with their original door, or switch to the remaining unopened door.
5.	The door the contestant finally selects is opened and the result is revealed.

The question is: does switching improve the contestant's odds of winning?

3. The Mathematics
3.1  Naive (Incorrect) Intuition
Most people reason as follows: after the host opens a door, two doors remain. One has the car, one has a goat. Therefore the probability of winning is 50/50 regardless of whether you switch. This reasoning feels compelling but is fundamentally wrong, because it ignores the information conveyed by the host's action.
3.2  Correct Probability Analysis
The key insight is that the host's action is not random — it is constrained by knowledge of the prize location. This constraint transfers probability mass in a non-obvious way.

Let the three doors be labelled A, B, and C. Suppose the contestant picks door A.

Initial probabilities:
•	P(car behind A) = 1/3
•	P(car behind B) = 1/3
•	P(car behind C) = 1/3

The contestant's initial pick has a 1/3 chance of being correct. Equivalently, there is a 2/3 chance that the car is behind one of the other two doors (B or C combined).

Now the host opens a door — say door B — revealing a goat. Consider what this tells us:
•	If the car is behind A (probability 1/3): the host could have opened either B or C, and chose B.
•	If the car is behind B (probability 1/3): the host cannot open B (it has the car). This scenario is now eliminated.
•	If the car is behind C (probability 1/3): the host must open B (it is the only goat door available). This scenario survives with its full probability.

After the host opens door B, the updated (posterior) probabilities are:
•	P(car behind A | host opens B) = 1/3
•	P(car behind C | host opens B) = 2/3

The 2/3 probability that was spread across B and C collapses entirely onto door C, because the host's action eliminated door B without providing any new evidence against door A.

Switching always captures that 2/3 probability. Staying always retains only 1/3. In the long run, a player who always switches wins approximately 66.7% of games; a player who always stays wins approximately 33.3%.
3.3  Formal Proof via Bayes' Theorem
Bayes' Theorem states that the posterior probability of a hypothesis H given evidence E is:

P(H | E)  =  P(E | H) · P(H)  /  P(E)

Let H_A = 'car is behind door A' and E = 'host opens door B'. Then:
•	P(H_A) = 1/3  (prior)
•	P(E | H_A) = 1/2  (host could open B or C with equal probability)
•	P(E) = P(E|H_A)·P(H_A) + P(E|H_B)·P(H_B) + P(E|H_C)·P(H_C) = (1/2)(1/3) + (0)(1/3) + (1)(1/3) = 1/2

Therefore:

P(H_A | E)  =  (1/2 · 1/3) / (1/2)  =  1/3
P(H_C | E)  =  (1 · 1/3) / (1/2)  =  2/3

This confirms the intuitive argument: switching wins with probability 2/3.
3.4  The N-Door Generalisation
The problem generalises elegantly. With N doors, one car, and a host who reveals N−2 goat doors after the initial pick:
•	Staying wins with probability: 1/N
•	Switching wins with probability: (N−1)/N

With 10 doors, staying gives a 10% win rate while switching gives 90%. With 100 doors, staying gives 1% while switching gives 99%. The advantage of switching becomes overwhelming as N grows, making the result even more persuasive at scale.
3.5  Enumeration of All Cases
For the standard 3-door version, there are only 6 distinct scenarios (3 possible car positions × 2 possible initial picks relative to the car). In all 6 cases:
•	If you initially picked the car (2 of 6 cases — probability 1/3): switching loses.
•	If you initially picked a goat (4 of 6 cases — probability 2/3): the host is forced to reveal the only other goat, and switching wins.

This exhaustive enumeration makes the result undeniable: switching is the dominant strategy.

4. Implementation in the Game
4.1  Architecture
The application follows a clean separation of concerns using React hooks and component-based design:
•	Game logic is entirely encapsulated in the custom hook use-monty-hall.ts, keeping the UI layer stateless with respect to game rules.
•	The Door3DCss component handles purely visual state (the 3D flip animation) independently of game logic.
•	The main page.tsx orchestrates user interactions and renders based on the game state machine.
4.2  Game State Machine
The game progresses through three phases managed by the useMontyHall hook:
•	choosing — The player selects an initial door. The prize is randomly placed at initialisation.
•	revealing — The hook selects a non-chosen, non-prize door to reveal as a goat, mirroring the host's constrained behaviour.
•	result — All doors are revealed and statistics are updated.

Critically, the host's goat reveal is implemented correctly: the hook filters for doors that are (a) not the player's selection, and (b) do not contain the prize, then picks one at random. This faithfully models the host's knowledge constraint that makes the probability result non-trivial.
4.3  The Bug Fix — Door State Reset
An important fix was applied to the Door3DCss component. The component maintains a local hasFlipped boolean to track whether the 3D flip animation has played. In the original code, this flag was a one-way latch: it would set to true when a door was revealed, but was never reset when a new game started. This caused doors to appear permanently open at the start of each new round.

The fix adds a reset branch to the existing useEffect: when door.isRevealed returns to false (as the game hook resets all doors on a new game), hasFlipped is also reset to false, allowing the doors to animate closed for the next round.
4.4  Statistics Tracking
The hook accumulates lifetime statistics across all games in the session:
•	totalGames — incremented on every completed game.
•	stayWins — incremented when the player stays with their original choice and wins.
•	switchWins — incremented when the player switches and wins.

These statistics are surfaced in the menu overlay, allowing players to empirically observe the 2:1 switch-to-stay win ratio converging over many games — providing a live, personal demonstration of the law of large numbers.

5. The Role of Probability and Cognitive Bias
5.1  Why Intuition Fails
The Monty Hall Problem is a textbook example of how human intuition mishandles conditional probability. Several cognitive biases contribute to the near-universal wrong answer:
•	The Equiprobability Bias — People assume that when two options remain, each must have a 50% chance. This ignores the prior distribution and the information embedded in the host's action.
•	Anchoring — The initial 1/3 probability of the chosen door feels 'updated' to 1/2 simply because one door was removed, without accounting for the asymmetric information structure.
•	Outcome Salience — The two surviving doors look identical on the surface; the hidden asymmetry (one was freely chosen, one was forced upon the player by the host's constraint) is not visually apparent.
•	Monty Fall Fallacy — If the host opened a door randomly (and happened to reveal a goat), the probabilities would genuinely be 50/50. The result depends entirely on the host's knowledge constraint. Players often fail to account for this.
5.2  Conditional Probability
The core mathematical concept at play is conditional probability: the probability of an event given that another event has already occurred. The notation P(A | B) reads 'the probability of A given B.'

Before the host acts, the prior probability of each door is 1/3. After the host acts, these prior probabilities are updated via Bayes' rule using the likelihood of the host's specific action under each hypothesis. Because the host's action is not random — it is deterministic given the prize location — the update is highly informative, even though it might not feel that way.
5.3  Information Theory Perspective
From an information theory standpoint, the host's reveal provides zero bits of information about your original door (the probability stays at 1/3), but provides substantial information about the other remaining door (its probability jumps from 1/3 to 2/3). This asymmetry is the entire source of the switching advantage.

6. Real-World Applications of the Underlying Principle
6.1  Medical Diagnosis and Bayesian Updating
In diagnostic medicine, a patient may test positive for a rare disease. Even with a 99% accurate test, if the disease affects only 1 in 10,000 people, a positive result still means the patient is more likely not to have the disease — because false positives on healthy patients vastly outnumber true positives. This is mathematically identical to the Monty Hall update structure: prior probability matters, and new information must be combined with it correctly via Bayes' rule.
6.2  Financial Decision-Making
Investors routinely face Monty Hall-type situations: after receiving new information (a company reports earnings, a competitor enters the market), they must decide whether to hold or switch a position. The naive response — treating the updated situation as a fresh 50/50 bet — ignores prior probabilities and the informational content of the new data. Bayesian portfolio management explicitly accounts for prior distributions and likelihood functions.
6.3  Legal Reasoning and Evidence
The prosecutor's fallacy is a courtroom error that mirrors the Monty Hall problem: confusing P(evidence | innocence) with P(innocence | evidence). Correctly evaluating forensic evidence requires conditioning on the base rate of guilt in the population, exactly as the Monty Hall solution requires conditioning on the prior distribution of the prize.
6.4  Machine Learning and Model Selection
In machine learning, Bayesian model selection works on the same principle. Given observed data, the posterior probability of a model is proportional to the likelihood of the data under that model multiplied by the model's prior probability. Ignoring priors (as naive intuition does in the Monty Hall problem) leads to systematically wrong model preferences, especially with sparse data.
6.5  Game Theory and Strategic Adaptation
In competitive games — poker, chess, business strategy — new information revealed by an opponent's action should update your probability estimates non-uniformly. An opponent who checks in poker, for instance, is more likely to be weak in specific board textures. Skilled players perform implicit Bayesian updates; unskilled players treat each new action as independent information, analogous to the naive 50/50 Monty Hall error.
6.6  Navigation and Search and Rescue
Search and rescue operations use Bayesian search theory, which is directly related to the Monty Hall principle. When a search of one area comes up empty, that negative information updates the probability distribution over remaining unsearched areas non-uniformly, depending on how thoroughly and reliably the empty area was searched. Resources are then reallocated to maximise the probability of finding the target — exactly the switch-to-2/3 logic applied at scale.
6.7  A/B Testing and Experimentation
In product and clinical experimentation, the multi-armed bandit problem generalises the Monty Hall structure to N options with unknown reward distributions. Exploration-exploitation algorithms (such as Thompson Sampling, which is explicitly Bayesian) continuously update probability estimates of each option's value based on accumulated evidence, and allocate resources to the currently most-probable-best option — a continuous, dynamic version of the switch decision.

7. Technology Stack
•	Framework: Next.js 16 with App Router
•	UI Library: React 19
•	Language: TypeScript 5.7
•	Styling: Tailwind CSS v4
•	Component Library: Radix UI primitives with shadcn/ui
•	Charts: Recharts (win-rate visualisation)
•	Icons: Lucide React
•	Package Manager: pnpm

8. Running Locally
6.	Clone the repository: git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
7.	Install dependencies: pnpm install
8.	Start the development server: pnpm dev
9.	Open http://localhost:3000 in your browser.

9. Further Reading
•	Selvin, S. (1975). 'A Problem in Probability.' The American Statistician, 29(1), 67.
•	vos Savant, M. (1990). 'Ask Marilyn.' Parade Magazine.
•	Gill, R. D. (2011). 'The Monty Hall Problem is not a Probability Puzzle.' Statistica Neerlandica, 65(1), 58–71.
•	Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus and Giroux.
•	Cover, T. M. & Thomas, J. A. (2006). Elements of Information Theory (2nd ed.). Wiley.

Switch. The math is on your side.
<img width="468" height="648" alt="image" src="https://github.com/user-attachments/assets/4be77395-4ef3-4c91-b359-9242c3ddfd68" />
