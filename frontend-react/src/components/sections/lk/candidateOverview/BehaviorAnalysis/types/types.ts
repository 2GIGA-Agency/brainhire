export interface BehaviorAnalyzeData {
	non_verbal_analysis: {
		mimicry: string;
		other_significant_signals: string;
	};
	communication_skills: {
		persuasiveness: string;
		clarity_structure_logic: string;
		vocabulary_lexicon_relevance: string;
		naturalness_potential_prompts: string;
	};
	psychological_profile: {
		confidence: string;
		thinking_style: string;
		stress_reaction: string;
		conflict_potential: string;
		communication_style: string;
		emotional_stability: string;
		introversion_extroversion: string;
	};
	summary_and_recommendations: {
		recommendation: string;
		next_steps_focus: string[];
		overall_summary_by_key_parameters: string;
	};
}