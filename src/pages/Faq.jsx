import React, { useState } from "react";
import { motion } from "framer-motion";

const faqData = [
  {
    question: "What is AI Content Generator?",
    answer:
      "It’s a tool that helps you automatically create content like blogs, summaries, video titles, etc., using AI.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes, basic features are free. Premium features require a subscription.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "Yes, you need to sign up to use all the features and save your history.",
  },
  {
    question: "Can I generate content in different languages?",
    answer:
      "Yes, our platform supports multiple languages to help you create content globally.",
  },
  {
    question: "Is my generated content saved somewhere?",
    answer:
      "Yes, if you are logged in, your content history is saved and accessible under the History section.",
  },
  {
    question: "How accurate is the generated content?",
    answer:
      "We use advanced AI models to provide highly accurate and grammatically correct content. You can edit it too!",
  },
  {
    question: "Can I use this tool on mobile?",
    answer:
      "Absolutely! The website is fully responsive and works smoothly on mobile and tablet devices.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-gray-800 text-white py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-indigo-400 mb-12">
        Frequently Asked Questions
      </h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 rounded-xl p-5 shadow-md cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => toggleAnswer(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-left">
                {item.question}
              </h3>
              <span className="text-indigo-400 text-2xl">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>

            {activeIndex === index && (
              <motion.p
                className="mt-3 text-gray-300 text-left"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {item.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
