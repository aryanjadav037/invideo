import React from "react";

const HeroSection = () => {
  return (
    <div>
      {/* <!-- Hero Section --> */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        {/* <!-- Main Headline with Gradient --> */}
        <h1 className="text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Generate AI Videos
          </span>
          <span className="text-black"> with</span>
        </h1>
        <h1 className="text-6xl font-bold mb-10 text-black">just text</h1>

        {/* <!-- Subtitle --> */}
        <p className="text-black text-xl mx-auto mb-12 ">
          Transform your imagination into eye-catching videos.{" "}
          <span className="text-[#7f7f7f]">Stand out,</span>
          <p className="text-[#7f7f7f] text-xl mx-auto mb-12 ">
            succeed, and create content that's ready to share and built to stand
            out.
          </p>
        </p>

        {/* <!-- CTA Button --> */}
        <div className="mb-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-black font-medium py-4 px-8 rounded-full text-lg transition-all duration-300 hover:shadow-lg">
            Generate video now
          </button>
        </div>

        {/* <!-- No Credit Card Text --> */}
        <p className="text-gray-500 text-sm">No credit card required</p>
      </section>

      {/* <!-- AI Video Generator Section --> */}
      <div className="flex justify-center items-center w-full px-4">
        {" "}
        {/* Container for centering */}
        <div className="relative h-[300px] md:h-[600px] w-full max-w-[1000px]">
          {" "}
          {/* Responsive sizing */}
          {/* Video Container */}
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-lg shadow-lg" // Added some styling
            poster="https://assets-static.invideo.io/images/large/Headerwebv30_c4ecb2a66f.webp"
          >
            <source
              src="https://assets-static.invideo.io/files/Invideo_Demo_HP_18_10_2024_V001_1921f1aee3.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* <!-- AI Video Generator Section --> */}
      <section class="max-w-6xl mx-auto px-4 py-16">
        {/* <!-- Heading --> */}
        <h2 class="text-5xl font-bold text-center mb-16">AI video generator</h2>

        {/* <!-- Two Column Content --> */}
        <div class="flex flex-col md:flex-row items-center bg-gray-50 rounded-2xl overflow-hidden">
          {/* <!-- Left Column - Text --> */}
          <div class="w-full md:w-1/2 p-8 md:p-12">
            <h3 class="text-3xl font-bold mb-4">
              Generate AI videos without a learning curve
            </h3>
            <p class="text-gray-600 mb-8">
              Type your idea, add the specifics—like length, platform, voiceover
              accent and get AI generated videos that put your ideas into focus.
            </p>
            <button class="border border-blue-500 text-blue-500 py-3 px-8 rounded-full hover:bg-blue-50 transition-colors">
              Create now
            </button>
          </div>

          {/* <!-- Right Column - Video Example --> */}
          <div class="w-full md:w-1/2 p-4">
            <div class="bg-black rounded-xl overflow-hidden relative">
              {/* <!-- Video Player Mockup --> */}
              <div class="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <img
                  src="https://ik.imagekit.io/sb8yfmfebk/tr:w-1000/images/large/Text_to_Video_e1c640e46c.webp"
                  alt="Time travel video example"
                  class="object-cover w-full h-full"
                />
              </div>

              {/* <!-- Input Example --> */}
              <div class="absolute top-4 left-0 right-0 mx-auto w-4/5">
                <div class="bg-gray-900 text-white p-3 rounded-lg flex items-center justify-between">
                  <p class="text-sm">
                    5 min Youtube video of a man travelling through time
                  </p>
                  <button class="bg-blue-500 text-white px-4 py-1 rounded flex items-center text-sm">
                    Generate
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* <!-- Video Controls Mockup --> */}
              <div class="absolute bottom-4 left-4 right-4 flex items-center">
                <button class="text-white mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                  </svg>
                </button>
                <div class="h-1 bg-blue-500 rounded-full flex-grow"></div>
                <span class="text-white text-xs ml-2">01:05 / 02:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HeroSection;
