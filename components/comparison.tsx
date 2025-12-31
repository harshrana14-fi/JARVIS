const Comparison = () => {
  return (
    <section id="comparison" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Why Choose JARVIS
        </h2>
        
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-6 bg-gray-800 border-b border-gray-700">
            <div className="text-center font-bold text-white">Feature</div>
            <div className="text-center font-bold text-white">JARVIS</div>
            <div className="text-center font-bold text-blue-400">ChatGPT</div>
            <div className="text-center font-bold text-green-400">Claude</div>
          </div>
          
          <div className="divide-y divide-gray-700">
            {[
              { feature: "Conversational Quality", jarvis: "Exceptional", chatgpt: "Good", claude: "Excellent" },
              { feature: "Reasoning Ability", jarvis: "Advanced", chatgpt: "Good", claude: "Excellent" },
              { feature: "Creative Tasks", jarvis: "Superior", chatgpt: "Good", claude: "Excellent" },
              { feature: "Customization", jarvis: "High", chatgpt: "Limited", claude: "Limited" },
              { feature: "Integration", jarvis: "Seamless", chatgpt: "Good", claude: "Good" },
            ].map((row, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-6">
                <div className="font-medium text-gray-300">{row.feature}</div>
                <div className="text-center font-semibold text-white">{row.jarvis}</div>
                <div className="text-center font-semibold text-blue-400">{row.chatgpt}</div>
                <div className="text-center font-semibold text-green-400">{row.claude}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;