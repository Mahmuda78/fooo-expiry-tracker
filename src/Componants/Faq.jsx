import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can a Food Expiry Tracker reduce food waste in our daily life?",
    answer:
      "A Food Expiry Tracker reminds us before food items expire. This helps us consume them on time instead of throwing them away, which directly reduces food waste.",
  },
  {
    question: "In what ways can tracking expiry dates save money for families?",
    answer:
      "By tracking expiry dates, families can plan meals better and avoid buying unnecessary duplicates. This saves money that would otherwise be wasted on spoiled food.",
  },
  {
    question: "How does expired food affect our health, and how can this tracker protect us?",
    answer:
      "Expired food can cause food poisoning, stomach problems, or other health issues. The tracker protects us by alerting about nearly expired food, so we eat safe and fresh items only.",
  },
  {
    question: "How can a Food Expiry Tracker encourage better shopping and storage habits?",
    answer:
      "With expiry reminders, users become more careful while shopping and storing food. They learn to buy in the right quantity, store properly, and prioritize items with closer expiry dates.",
  },
  {
    question: "What role does a Food Expiry Tracker play in building an eco-friendly lifestyle?",
    answer:
      "Food wastage increases greenhouse gases and harms the environment. By minimizing waste, the tracker supports sustainable living and promotes an eco-friendly lifestyle.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-5">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-600">
         Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-2xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium text-lg bg-green-50 hover:bg-green-100 transition"
            >
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 transform transition ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
