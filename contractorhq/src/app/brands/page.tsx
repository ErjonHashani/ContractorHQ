import Link from "next/link";
import Image from "next/image";
import { FiTool, FiBattery, FiZap, FiShield, FiGlobe, FiArrowRight } from "react-icons/fi";

const brands = ["Makita", "Milwaukee", "DeWalt", "Bosch", "Stihl"];

const brandLogos: { [key: string]: string } = {
  Makita: "/images/brands/makita-logo.png",
  Milwaukee: "/images/brands/milwaukee-logo.png",
  DeWalt: "/images/brands/dewalt-logo.png",
  Bosch: "/images/brands/bosch-logo.png",
  Stihl: "/images/brands/stihl-logo.png",
};

const brandColors: { [key: string]: string } = {
  Makita: "from-teal-400 to-primary",
  Milwaukee: "from-red-600 to-red-400",
  DeWalt: "from-yellow-600 to-yellow-400",
  Bosch: "from-blue-700 to-blue-500",
  Stihl: "from-orange-600 to-orange-400",
};

const brandDescriptions: { [key: string]: string } = {
  Makita:
    "Japanese precision tools known for durability and cordless innovation. Founded in 1915, Makita delivers professional-grade power tools trusted on job sites worldwide.",
  Milwaukee:
    "Heavy-duty tools with POWERSTATE brushless motors for professionals. Milwaukee focuses on creating solutions for the toughest job site challenges.",
  DeWalt:
    "American-made rugged tools with 20V MAX battery systems. DeWalt offers industrial-grade performance for construction and woodworking.",
  Bosch:
    "German engineering offering precise and efficient power tools. Bosch combines innovation with reliability across their professional tool range.",
  Stihl:
    "World leader in chainsaws and outdoor power equipment. Stihl's professional-grade tools are built for demanding outdoor applications.",
};

const brandSpecialties: { [key: string]: string[] } = {
  Makita: [
    "Cordless innovation",
    "Brushless motors",
    "Dust extraction",
    "Precision engineering",
  ],
  Milwaukee: [
    "REDLITHIUM batteries",
    "PACKOUT storage",
    "ONE-KEY technology",
    "Heavy-duty construction",
  ],
  DeWalt: [
    "FLEXVOLT system",
    "TOUGHSYSTEM storage",
    "Atomic compact tools",
    "Jobsite durability",
  ],
  Bosch: [
    "12V EC brushless",
    "Dust management",
    "CORE18V batteries",
    "Precision cutting",
  ],
  Stihl: [
    "Chainsaw technology",
    "AK battery system",
    "4-MIX engines",
    "Professional landscaping",
  ],
};

const BrandOverviewPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-light to-gray-hundred">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              Premium Tool Brands
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover top-quality tools from industry-leading manufacturers
          </p>
        </div>

        {/* Original Large Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-10 mb-20">
          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/brands/${brand}`}
              className="group relative h-full min-h-[380px] overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-90 group-hover:opacity-100 transition-opacity duration-500 ${brandColors[brand]}`}
              ></div>

              <div className="relative z-10 flex flex-col items-center justify-center p-10 h-full">
                <div className="mb-10 w-48 h-48 bg-gray-200 rounded-full backdrop-blur-sm flex items-center justify-center p-5 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                  <Image
                    src={brandLogos[brand]}
                    alt={`${brand} logo`}
                    width={140}
                    height={140}
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>

                <div className="mt-auto text-center">
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {brand}
                  </h3>
                  <span className="inline-block px-5 py-2 text-sm font-semibold tracking-wider text-white bg-black/20 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                    Explore Products
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/30 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            </Link>
          ))}
        </div>

        {/* Brand Information Panels */}
        <div className="space-y-16">
          {brands.map((brand) => (
            <div
              key={`panel-${brand}`}
              className="bg-light rounded-2xl shadow-xl overflow-hidden border-1 border-gray-light"
            >
              <div className="flex flex-col md:flex-row">
                {/* Brand Header with Gradient */}
                <div
                  className={`md:w-1/3 bg-gradient-to-br p-8 flex flex-col justify-center ${brandColors[brand]}`}
                >
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-white p-4 rounded-full backdrop-blur-sm">
                      <Image
                        src={brandLogos[brand]}
                        alt={`${brand} logo`}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-white/90 text-center">
                    {brandDescriptions[brand]}
                  </p>
                </div>

                {/* Brand Details */}
                <div className="md:w-2/3 p-8">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-7 mb-4 flex items-center">
                      <FiTool className="w-6 h-6 mr-2 text-gray-7" />
                      Product Specialties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {brandSpecialties[brand].map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <FiBattery className="w-8 h-8 mr-4 flex-shrink-0 text-gray-7" />
                      <div>
                        <h4 className="font-bold text-gray-7 mb-2">
                          Power Systems
                        </h4>
                        <p className="text-gray-five">
                          {brand === "Makita" &&
                            "18V LXT & 40V XGT battery platforms with rapid charging"}
                          {brand === "Milwaukee" &&
                            "REDLITHIUM HIGH OUTPUT batteries with extended runtime"}
                          {brand === "DeWalt" &&
                            "20V MAX & FLEXVOLT battery systems with cross-compatibility"}
                          {brand === "Bosch" &&
                            "CORE18V & 12V EC batteries with professional power management"}
                          {brand === "Stihl" &&
                            "AK System batteries with professional-grade runtime"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FiZap className="w-8 h-8 mr-4 flex-shrink-0 text-gray-7" />
                      <div>
                        <h4 className="font-bold text-gray-7 mb-2">
                          Key Innovation
                        </h4>
                        <p className="text-gray-five">
                          {brand === "Makita" &&
                            "Anti-Vibration Technology (AVT) for extended use comfort"}
                          {brand === "Milwaukee" &&
                            "ONE-KEY digital platform for tool tracking and customization"}
                          {brand === "DeWalt" &&
                            "TOUGHSYSTEM® modular storage solutions for job sites"}
                          {brand === "Bosch" &&
                            "Dust Extraction System for cleaner, healthier work environments"}
                          {brand === "Stihl" &&
                            "4-MIX engine technology combining 2-stroke power with 4-stroke efficiency"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FiShield className="w-8 h-8 mr-4 flex-shrink-0 text-gray-7" />
                      <div>
                        <h4 className="font-bold text-gray-7 mb-2">
                          Durability
                        </h4>
                        <p className="text-gray-five">
                          {brand === "Makita" &&
                            "Industrial-grade construction with metal gear housings"}
                          {brand === "Milwaukee" &&
                            "Over-molded casing and shock-absorbing materials"}
                          {brand === "DeWalt" &&
                            "All-metal transmissions and reinforced housings"}
                          {brand === "Bosch" &&
                            "Precision-engineered components with reinforced casings"}
                          {brand === "Stihl" &&
                            "Professional-grade materials built for outdoor extremes"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FiGlobe className="w-8 h-8 mr-4 flex-shrink-0 text-gray-7" />
                      <div>
                        <h4 className="font-bold text-gray-7 mb-2">
                          Professional Use
                        </h4>
                        <p className="text-gray-five">
                          {brand === "Makita" &&
                            "Trusted by contractors in construction and woodworking"}
                          {brand === "Milwaukee" &&
                            "Preferred by electricians, plumbers, and HVAC technicians"}
                          {brand === "DeWalt" &&
                            "Jobsite standard for framers and general contractors"}
                          {brand === "Bosch" &&
                            "Chosen by finish carpenters and cabinet makers"}
                          {brand === "Stihl" &&
                            "Industry standard for arborists and landscapers"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Link
                      href={`/brands/${brand}`}
                      className="inline-flex items-center justify-center px-6 py-3 bg-dark text-light font-bold rounded-lg transition-all duration-300 hover:bg-gray-7 hover:scale-[1.02]"
                    >
                      View Full {brand} Product Line
                      <FiArrowRight className="h-5 w-5 ml-2"/>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 italic text-lg">
            Trusted by professionals worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandOverviewPage;
