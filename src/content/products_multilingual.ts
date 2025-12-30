import type { Lang } from "../components/language";

// Product classification dimensions (similar to Arrowy's multi-dimensional approach)
export type ProductUsage = 
  | "Family Entertainment"  // 家庭娱乐
  | "Thrill Adventure"      // 刺激冒险
  | "Water Attraction"       // 水上项目
  | "Kiddie Fun";           // 儿童游乐

export type VenueType = 
  | "Indoor"    // 室内
  | "Outdoor"   // 户外
  | "Both";     // 室内外通用

export type TargetAudience = 
  | "Family"    // 家庭
  | "Adults"    // 成人
  | "Kids"      // 儿童
  | "All Ages"; // 全年龄

export type ProductMultilingual = {
  name: { en: string; zh: string };
  category: { en: string; zh: string };
  footprint: { en: string; zh: string };
  height: { en: string; zh: string };
  riders: string;
  status: "New" | "Used";
  year?: string;
  badge?: string;
  image?: string;
  // Enhanced classification fields (multi-dimensional like Arrowy)
  usage?: ProductUsage;           // Usage type: Family Entertainment, Thrill Adventure, etc.
  venueType?: VenueType;          // Venue type: Indoor, Outdoor, Both
  targetAudience?: TargetAudience; // Target audience: Family, Adults, Kids, All Ages
  // Decision-making content fields
  positioning?: { en: string; zh: string }; // ① Product positioning statement
  idealFor?: { en: string[]; zh: string[] }; // ② Ideal scenarios
  notRecommendedFor?: { en: string[]; zh: string[] }; // ② Not recommended scenarios
  venueRequirements?: { en: string; zh: string }; // ③ Venue & requirements explanation
  powerSupply?: { en: string; zh: string }; // ③ Power supply info
  safetyCompliance?: { en: string[]; zh: string[] }; // ④ Safety & compliance
  deliveryInstallation?: { en: string[]; zh: string[] }; // ⑤ Delivery & installation
  afterSales?: { en: string[]; zh: string[] }; // ⑤ After-sales support
  videoLinks?: { youtube?: string; tiktok?: string }; // ⑥ Video & social media
  ctaText?: { en: string; zh: string }; // ⑦ Clear next action CTA
};

export const productsMultilingual: ProductMultilingual[] = [
  {
    name: { en: "Nuclear energy crisis", zh: "核能危机" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D12M*H5.9M (Including Fence)", zh: "直径12M*高5.9M (含围栏)" },
    height: { en: "5.9 m", zh: "5.9米" },
    riders: "36",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 0.jpeg",
    positioning: { 
      en: "A family-friendly ride designed for indoor amusement centers. Suitable for small to medium-size venues.", 
      zh: "专为室内娱乐中心设计的家庭友好型游乐设备。适合中小型场地。" 
    },
    idealFor: { 
      en: ["Indoor amusement parks", "FECs / shopping mall entertainment areas", "Family & kids zones"], 
      zh: ["室内游乐园", "家庭娱乐中心/购物中心娱乐区", "家庭和儿童区域"] 
    },
    venueRequirements: { 
      en: "Suitable for medium-size venues", 
      zh: "适合中型场地" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Energy Plan", zh: "能源计划" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L16M*W10.5M*H11M () (Including Fence)", zh: "长16M*宽10.5M*高11M (含围栏)" },
    height: { en: "11 m", zh: "11米" },
    riders: "30",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 1.jpeg",
    positioning: { 
      en: "A medium-scale family attraction perfect for theme parks and large FECs. Requires adequate ceiling height.", 
      zh: "适合主题公园和大型家庭娱乐中心的中型家庭游乐设备。需要足够的层高。" 
    },
    idealFor: { 
      en: ["Theme parks", "Large FECs", "Shopping malls with high ceilings"], 
      zh: ["主题公园", "大型家庭娱乐中心", "高天花板的购物中心"] 
    },
    notRecommendedFor: { 
      en: ["Very limited ceiling height", "Outdoor without shelter"], 
      zh: ["层高非常有限", "无遮挡的户外环境"] 
    },
    venueRequirements: { 
      en: "Requires minimum 12m ceiling height", 
      zh: "需要至少12米层高" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Star Nuclear Guard", zh: "星核护卫队" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D14M*H4.6M() (Including Fence)", zh: "直径14M*高4.6M(含围栏)" },
    height: { en: "4.6 m", zh: "4.6米" },
    riders: "24",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 10.jpeg",
    positioning: { 
      en: "A large-capacity family ride perfect for high-traffic entertainment venues. Low height design makes it ideal for venues with standard ceiling clearance.", 
      zh: "适合高客流量娱乐场所的大容量家庭游乐设备。低高度设计使其适合标准层高的场地。" 
    },
    idealFor: { 
      en: ["Large FECs", "Shopping malls", "Indoor theme parks", "High-traffic entertainment zones"], 
      zh: ["大型家庭娱乐中心", "购物中心", "室内主题公园", "高客流量娱乐区"] 
    },
    venueRequirements: { 
      en: "Requires approximately 154 sqm area. Suitable for venues with standard ceiling height (5m+).", 
      zh: "需要约154平方米场地。适合标准层高（5米以上）的场地。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Meow Nuclear Team", zh: "喵核战队" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D8M*H4.9M () (Including Fence)", zh: "直径8M*高4.9M (含围栏)" },
    height: { en: "4.9 m", zh: "4.9米" },
    riders: "12",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 11.jpeg",
    positioning: { 
      en: "A compact family ride designed for small to medium venues. Perfect for maximizing space efficiency in limited areas.", 
      zh: "专为中小型场地设计的紧凑型家庭游乐设备。非常适合在有限空间内最大化利用效率。" 
    },
    idealFor: { 
      en: ["Small FECs", "Shopping mall entertainment corners", "Family entertainment centers", "Compact indoor spaces"], 
      zh: ["小型家庭娱乐中心", "购物中心娱乐角落", "家庭娱乐中心", "紧凑型室内空间"] 
    },
    venueRequirements: { 
      en: "Requires approximately 50 sqm area. Suitable for venues with standard ceiling height (5.5m+).", 
      zh: "需要约50平方米场地。适合标准层高（5.5米以上）的场地。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "SPATIOTEMPORAL EDDY CURRENT - Model 2", zh: "时空涡流 - 型号2" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "12.44M*10.34M*6.3M", zh: "12.44M*10.34M*6.3M" },
    height: { en: "N/A", zh: "N/A" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 12.jpeg",
    positioning: { 
      en: "A medium-scale interactive family attraction with unique design. Ideal for venues seeking distinctive entertainment experiences.", 
      zh: "具有独特设计的中型互动家庭游乐设备。适合寻求独特娱乐体验的场地。" 
    },
    idealFor: { 
      en: ["Theme parks", "Medium to large FECs", "Entertainment centers", "Indoor amusement facilities"], 
      zh: ["主题公园", "中大型家庭娱乐中心", "娱乐中心", "室内游乐设施"] 
    },
    venueRequirements: { 
      en: "Requires approximately 129 sqm area. Minimum ceiling height 7m recommended.", 
      zh: "需要约129平方米场地。建议最低层高7米。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Stellar core ripples", zh: "星核涟漪" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L6.82M*W4.2M*H6.2M () (Including Fence)", zh: "长6.82M*宽4.2M*高6.2M (含围栏)" },
    height: { en: "6.2 m", zh: "6.2米" },
    riders: "20",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 13.jpeg",
    positioning: { 
      en: "A compact yet high-capacity family ride perfect for space-constrained venues. Excellent rider-to-space ratio.", 
      zh: "适合空间受限场地的紧凑型高容量家庭游乐设备。出色的载客数与空间比。" 
    },
    idealFor: { 
      en: ["Small to medium FECs", "Shopping malls", "Compact entertainment areas", "Space-optimized venues"], 
      zh: ["中小型家庭娱乐中心", "购物中心", "紧凑型娱乐区", "空间优化的场地"] 
    },
    venueRequirements: { 
      en: "Requires approximately 29 sqm area. Suitable for venues with ceiling height 7m+.", 
      zh: "需要约29平方米场地。适合层高7米以上的场地。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Star Nucleus Explorer - Model 2", zh: "星核探险家 - 型号2" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "Diameter:10M*Height:6.3M (Including Fence)", zh: "直径:10M*高6.3M (含围栏)" },
    height: { en: "6.3 m", zh: "6.3米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 14.jpeg",
    positioning: { 
      en: "A medium-scale family ride with moderate height requirements. Perfect balance of capacity and space efficiency.", 
      zh: "中等规模的家庭游乐设备，层高要求适中。容量与空间效率的完美平衡。" 
    },
    idealFor: { 
      en: ["Medium FECs", "Indoor theme parks", "Shopping mall entertainment areas", "Family entertainment centers"], 
      zh: ["中型家庭娱乐中心", "室内主题公园", "购物中心娱乐区", "家庭娱乐中心"] 
    },
    venueRequirements: { 
      en: "Requires approximately 79 sqm area. Minimum ceiling height 7m recommended.", 
      zh: "需要约79平方米场地。建议最低层高7米。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Meow Nuclear Carousel", zh: "星核旋转木马" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D6.6M*H5.7M() (Including Fence)", zh: "直径6.6M*高5.7M(含围栏)" },
    height: { en: "5.7 m", zh: "5.7米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 15.jpeg",
    positioning: { 
      en: "A compact carousel-style family ride perfect for small venues. Classic design with modern safety features.", 
      zh: "适合小型场地的紧凑型旋转木马式家庭游乐设备。经典设计，配备现代安全功能。" 
    },
    idealFor: { 
      en: ["Small FECs", "Shopping mall entertainment corners", "Compact indoor spaces", "Family entertainment zones"], 
      zh: ["小型家庭娱乐中心", "购物中心娱乐角落", "紧凑型室内空间", "家庭娱乐区"] 
    },
    venueRequirements: { 
      en: "Requires approximately 34 sqm area. Suitable for venues with ceiling height 6.5m+.", 
      zh: "需要约34平方米场地。适合层高6.5米以上的场地。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Galaxy Collision", zh: "银河大碰撞" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L 1.5M*W 0.9M*H 0.7M", zh: "长 1.5M*宽 0.9M*高 0.7M" },
    height: { en: "0.7 m", zh: "0.7米" },
    riders: "150",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 16.jpeg",
    positioning: { 
      en: "A compact interactive attraction perfect for high-capacity entertainment zones. Ideal for venues with limited space but high traffic.", 
      zh: "适合高容量娱乐区的紧凑型互动游乐设备。非常适合空间有限但客流量高的场地。" 
    },
    idealFor: { 
      en: ["High-traffic entertainment zones", "Compact FECs", "Shopping mall play areas", "Family entertainment centers"], 
      zh: ["高客流量娱乐区", "紧凑型家庭娱乐中心", "购物中心游戏区", "家庭娱乐中心"] 
    },
    venueRequirements: { 
      en: "Requires minimal space (approximately 1.4 sqm). Perfect for space-constrained venues.", 
      zh: "需要最小空间（约1.4平方米）。非常适合空间受限的场地。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Meow Nuclear Storm", zh: "猫核风暴" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D7M*H6M() (Including Fence)", zh: "直径7M*高6M(含围栏)" },
    height: { en: "6 m", zh: "6米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 17.jpeg",
    positioning: { 
      en: "A medium-scale family ride with dynamic design. Perfect for venues seeking engaging entertainment experiences.", 
      zh: "具有动感设计的中型家庭游乐设备。适合寻求引人入胜娱乐体验的场地。" 
    },
    idealFor: { 
      en: ["Medium FECs", "Indoor theme parks", "Entertainment centers", "Family entertainment zones"], 
      zh: ["中型家庭娱乐中心", "室内主题公园", "娱乐中心", "家庭娱乐区"] 
    },
    venueRequirements: { 
      en: "Requires approximately 38 sqm area. Suitable for venues with ceiling height 7m+.", 
      zh: "需要约38平方米场地。适合层高7米以上的场地。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Super Warrior", zh: "超能战士" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D9M*H6.3M () (Including Fence)", zh: "直径9M*高6.3M (包含围栏)" },
    height: { en: "6.3 m", zh: "6.3米" },
    riders: "12",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 18.jpeg",
    positioning: { 
      en: "A medium-scale themed family ride with exciting design. Perfect for venues looking to add a unique attraction.", 
      zh: "具有激动人心设计的中型主题家庭游乐设备。适合寻求独特景点的场地。" 
    },
    idealFor: { 
      en: ["Theme parks", "Medium FECs", "Entertainment centers", "Indoor amusement facilities"], 
      zh: ["主题公园", "中型家庭娱乐中心", "娱乐中心", "室内游乐设施"] 
    },
    venueRequirements: { 
      en: "Requires approximately 64 sqm area. Minimum ceiling height 7.5m recommended.", 
      zh: "需要约64平方米场地。建议最低层高7.5米。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Star core jumping bed", zh: "星核蹦乐床" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L7M*W6M*H5.6M (L7M*W6M*H5.6M)", zh: "长7M*宽6M*高5.6M (L7M*W6M*H5.6M)" },
    height: { en: "5.6 m", zh: "5.6米" },
    riders: "6",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 19.jpeg",
    positioning: { 
      en: "A compact trampoline-style attraction perfect for active play areas. Ideal for venues focusing on physical activity and fun.", 
      zh: "适合活跃游戏区的紧凑型蹦床式游乐设备。适合专注于体育活动和娱乐的场地。" 
    },
    idealFor: { 
      en: ["Trampoline parks", "Activity centers", "Family entertainment zones", "Indoor play areas"], 
      zh: ["蹦床公园", "活动中心", "家庭娱乐区", "室内游戏区"] 
    },
    venueRequirements: { 
      en: "Requires approximately 42 sqm area. Suitable for venues with ceiling height 6.5m+.", 
      zh: "需要约42平方米场地。适合层高6.5米以上的场地。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Future Engine", zh: "未来引擎" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L15M*W10M (Including Fence)", zh: "长15M*宽10M (含围栏)" },
    height: { en: "N/A", zh: "N/A" },
    riders: "12",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 2.jpeg",
    positioning: { 
      en: "A large-scale themed family attraction perfect for major entertainment venues. Requires substantial space but delivers impressive visual impact.", 
      zh: "适合大型娱乐场所的大规模主题家庭游乐设备。需要较大空间，但能带来令人印象深刻的视觉效果。" 
    },
    idealFor: { 
      en: ["Large theme parks", "Major FECs", "Entertainment complexes", "Large-scale indoor venues"], 
      zh: ["大型主题公园", "大型家庭娱乐中心", "娱乐综合体", "大型室内场地"] 
    },
    notRecommendedFor: { 
      en: ["Small venues", "Limited space areas"], 
      zh: ["小型场地", "空间有限的区域"] 
    },
    venueRequirements: { 
      en: "Requires approximately 150 sqm area. Suitable for large venues with adequate space.", 
      zh: "需要约150平方米场地。适合有足够空间的大型场地。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Rotating Matrix", zh: "旋转矩阵" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D9M*H6.7M () (Including Fence)", zh: "直径9M*高6.7M (含围栏)" },
    height: { en: "6.7 m", zh: "6.7米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 20.jpeg",
  },
  {
    name: { en: "MEOW NUCLEAR MECHA CAR", zh: "喵核机甲车" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L1.6M*W1.2M*H2.3M", zh: "长1.6M*宽1.2M*高2.3M" },
    height: { en: "2.3 m", zh: "2.3米" },
    riders: "12",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 21.jpeg",
  },
  {
    name: { en: "MEOW NUCLEAR MECHA CAR (Single)", zh: "喵核机甲车（单座）" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L1.6M*W1.2M*H2.3M", zh: "长1.6M*宽1.2M*高2.3M" },
    height: { en: "2.3 m", zh: "2.3米" },
    riders: "1",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 22.jpeg",
  },
  {
    name: { en: "Meow Core Train", zh: "喵核小火车" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L12M*W1.2M*H1.4M-1.6M (Size: L12M*W1.2M*H1.4-1.6M)", zh: "长12M*宽1.2M*高1.4M-1.6M (Size: L12M*W1.2M*H1.4-1.6M)" },
    height: { en: "1.4 m", zh: "1.4米" },
    riders: "11",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 23.jpeg",
  },
  {
    name: { en: "MEOW CORE TRAIN - Model 2", zh: "喵核小火车 - 型号2" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L12M*W1.2M*H1.4M-1.6M", zh: "长12M*宽1.2M*高1.4M-1.6M" },
    height: { en: "1.4 m", zh: "1.4米" },
    riders: "11",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 24.jpeg",
  },
  {
    name: { en: "Cat-core bumper cars", zh: "Cat-core bumper cars" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "1.7M*1.1M*0.95M", zh: "1.7M*1.1M*0.95M" },
    height: { en: "N/A", zh: "N/A" },
    riders: "2",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 25.jpeg",
  },
  {
    name: { en: "Cobra bumper cars", zh: "Cobra bumper cars" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L1.8M*W1.1M*H1.72M", zh: "长1.8M*宽1.1M*高1.72M" },
    height: { en: "1.72 m", zh: "1.72米" },
    riders: "2",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 26.jpeg",
  },
  {
    name: { en: "Alien Invasion", zh: "Alien Invasion" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D11M*H4.8M() (Including Fence)", zh: "直径11M*高4.8M(含围栏)" },
    height: { en: "4.8 m", zh: "4.8米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 3.jpeg",
  },
  {
    name: { en: "Quantum Jump", zh: "量子弹跳" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D8.6M*H6.1M (Including Fence)", zh: "直径8.6M*高6.1M (含围栏)" },
    height: { en: "6.1 m", zh: "6.1米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 4.jpeg",
    positioning: { 
      en: "A medium-scale trampoline-style family attraction perfect for active play areas. Ideal for venues focusing on physical activity and fun.", 
      zh: "适合活跃游戏区的中型蹦床式家庭游乐设备。适合专注于体育活动和娱乐的场地。" 
    },
    idealFor: { 
      en: ["Trampoline parks", "Activity centers", "Family entertainment zones", "Indoor play areas"], 
      zh: ["蹦床公园", "活动中心", "家庭娱乐区", "室内游戏区"] 
    },
    venueRequirements: { 
      en: "Requires approximately 58 sqm area. Suitable for venues with ceiling height 7m+.", 
      zh: "需要约58平方米场地。适合层高7米以上的场地。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Pendulum Play", zh: "玩转钟摆" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L8M*W7M*H6M (Including Fence)", zh: "长8M*宽7M*高6M (含围栏)" },
    height: { en: "6 m", zh: "6米" },
    riders: "20",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 5.jpeg",
    positioning: { 
      en: "A medium-scale pendulum-style family ride perfect for entertainment centers. Engaging motion experience for all ages.", 
      zh: "适合娱乐中心的中型钟摆式家庭游乐设备。为所有年龄段提供引人入胜的运动体验。" 
    },
    idealFor: { 
      en: ["Medium FECs", "Indoor theme parks", "Entertainment centers", "Family entertainment zones"], 
      zh: ["中型家庭娱乐中心", "室内主题公园", "娱乐中心", "家庭娱乐区"] 
    },
    venueRequirements: { 
      en: "Requires approximately 56 sqm area. Suitable for venues with ceiling height 7m+.", 
      zh: "需要约56平方米场地。适合层高7米以上的场地。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "CrossFire", zh: "穿越火线" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L:9.75M*W4M*H6.85M (Including Fence)", zh: "长9.75 M*宽4M*高6.85 M (含围栏)" },
    height: { en: "6.85 m", zh: "6.85米" },
    riders: "24",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 6.jpeg",
    positioning: { 
      en: "A high-capacity family ride perfect for high-traffic entertainment venues. Compact footprint with excellent capacity.", 
      zh: "适合高客流量娱乐场所的高容量家庭游乐设备。紧凑的占地面积，出色的载客量。" 
    },
    idealFor: { 
      en: ["Large FECs", "Shopping malls", "Indoor theme parks", "High-traffic entertainment zones"], 
      zh: ["大型家庭娱乐中心", "购物中心", "室内主题公园", "高客流量娱乐区"] 
    },
    venueRequirements: { 
      en: "Requires approximately 39 sqm area. Suitable for venues with ceiling height 8m+.", 
      zh: "需要约39平方米场地。适合层高8米以上的场地。" 
    },
    powerSupply: { 
      en: "Standard industrial power supported", 
      zh: "支持标准工业电源" 
    },
    safetyCompliance: { 
      en: ["Designed according to international safety standards", "CE / ISO compliance available upon request", "Tested before delivery"], 
      zh: ["按照国际安全标准设计", "可根据要求提供CE/ISO认证", "交付前经过测试"] 
    },
    deliveryInstallation: { 
      en: ["Standard export packaging", "Installation guidance provided", "Remote technical support available"], 
      zh: ["标准出口包装", "提供安装指导", "提供远程技术支持"] 
    },
    afterSales: { 
      en: ["Spare parts support", "Online assistance during operation"], 
      zh: ["备件支持", "运营期间在线协助"] 
    },
    ctaText: { 
      en: "Contact for layout suggestion & quotation", 
      zh: "获取布局建议与报价" 
    },
  },
  {
    name: { en: "Nuclear Disco", zh: "核能迪斯科" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D9.1M*H7.3M () (Including Fence)", zh: "直径9.1M*高7.3M (含围栏)" },
    height: { en: "7.3 m", zh: "7.3米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 7.jpeg",
  },
  {
    name: { en: "RoboCop", zh: "星际迷航" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L7.84M*W6.6M*H3.8M (Including Fence)", zh: "长7.84M*宽6.6M*高3.8M (含围栏)" },
    height: { en: "3.8 m", zh: "3.8米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 8.jpeg",
  },
  {
    name: { en: "Catnip Knight", zh: "喵核骑士" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D10.1M*H7.5M () (Including Fence)", zh: "直径10.1M*高7.5M (含围栏)" },
    height: { en: "7.5 m", zh: "7.5米" },
    riders: "20",
    status: "New",
    image: "/products/米盈游乐设备产品介绍 conv 9.jpeg",
  },
  {
    name: { en: "Nuclear Energy Crisis Flying Chair", zh: "核能危机 空中飞椅" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D12M*H5.9M (Including Fence)", zh: "直径12M*高5.9M (含围栏)" },
    height: { en: "5.9 m", zh: "5.9米" },
    riders: "36",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 0.jpeg",
  },
  {
    name: { en: "MOUNTAINEER", zh: "爬山车 MOUNTAINEER" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L16M*W10.5M*H11M (Including Fence)", zh: "长16M*宽10.5M*高11M (含围栏)" },
    height: { en: "11 m", zh: "11米" },
    riders: "30",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 1.jpeg",
  },
  {
    name: { en: "The Great Collision of Galaxies", zh: "银河大碰撞- 碰碰车" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L 1.5M x W 0.9M x H 0.7M", zh: "长 1.5M x 宽 0.9M x 高 0.7M" },
    height: { en: "0.7 m", zh: "0.7米" },
    riders: "150",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 10.jpeg",
  },
  {
    name: { en: "SPATIOTEMPORAL EDDY CURRENT - Model 2", zh: "时空涡流 - 型号2" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L12.44M*W10.34M*H6.3M", zh: "长12.44M*宽10.34M*高6.3M" },
    height: { en: "6.3 m", zh: "6.3米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 11.jpeg",
  },
  {
    name: { en: "GLOBAL SPACE", zh: "太空环球记 GLOBAL SPACE" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D7M*H6M () (Including Fence)", zh: "直径7M*高6M (含围栏)" },
    height: { en: "6 m", zh: "6米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 12.jpeg",
  },
  {
    name: { en: "INTERSTELLAR MADNESS STATION", zh: "星际疯狂站)" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D8M*H4.5M (D8M*H4.5M)", zh: "直径8M*高4.5M (D8M*H4.5M)" },
    height: { en: "4.5 m", zh: "4.5米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 13.jpeg",
  },
  {
    name: { en: "MEOW NUCLEAR MECHA CAR (Single) - Model 2", zh: "喵核机甲车（单座）- 型号2" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L1.6M*W1.2M*H2.3M", zh: "长1.6M*宽1.2M*高2.3M" },
    height: { en: "2.3 m", zh: "2.3米" },
    riders: "1",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 14.jpeg",
  },
  {
    name: { en: "MEOW NUCLEAR MECHA CAR (Single) - Model 3", zh: "喵核机甲车（单座）- 型号3" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L1.6M*W1.2M*H2.3M (L1.6M*W1.2M*H2.3M)", zh: "长1.6M*宽1.2M*高2.3M (L1.6M*W1.2M*H2.3M)" },
    height: { en: "2.3 m", zh: "2.3米" },
    riders: "1",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 15.jpeg",
  },
  {
    name: { en: "MEOW CORE TRAIN - Model 3", zh: "喵核小火车 - 型号3" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L12M*W1.2M*H1.4-1.6M", zh: "长12M*宽1.2M*高1.4-1.6M" },
    height: { en: "N/A", zh: "N/A" },
    riders: "11",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 16.jpeg",
  },
  {
    name: { en: "MEOW CORE TRAIN - Model 4", zh: "喵核小火车 - 型号4" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L12M*W1.2M*H1.4-1.6M", zh: "长12M*宽1.2M*高1.4-1.6M" },
    height: { en: "N/A", zh: "N/A" },
    riders: "11",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 17.jpeg",
  },
  {
    name: { en: "POSEIDON", zh: "海神号 POSEIDON" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L15M*W10M*H6M", zh: "长15M*宽10M*高6M" },
    height: { en: "6 m", zh: "6米" },
    riders: "24",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 18.jpeg",
  },
  {
    name: { en: "INTERSTELLAR", zh: "穿越时空 INTERSTELLAR" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L15M*W10M*H6M (L15M*W10M*H6M), H:1.98M (Equipment Operating Height: 1.98M)", zh: "长15M*宽10M*高6M (L15M*W10M*H6M), 设备运行高度:1.98M (Equipment Operating Height: 1.98M)" },
    height: { en: "6 m", zh: "6米" },
    riders: "18",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 19.jpeg",
  },
  {
    name: { en: "Quantum Jump - Model 2", zh: "量子弹跳 - 型号2" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D8.6M*H6.1M () (Including Fence)", zh: "直径8.6M*高6.1M (含围栏)" },
    height: { en: "6.1 m", zh: "6.1米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 2.jpeg",
  },
  {
    name: { en: "LUCKY CAROUSEL", zh: "幸运转马" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D8M*H6.3M (Including Fence)", zh: "直径8M*高6.3M (含围栏)" },
    height: { en: "6.3 m", zh: "6.3米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 20.jpeg",
  },
  {
    name: { en: "ROMANTIC CAROUSEL", zh: "浪漫拾光转马" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D8M*H6.3M (Including Fence)", zh: "直径8M*高6.3M (含围栏)" },
    height: { en: "6.3 m", zh: "6.3米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 21.jpeg",
  },
  {
    name: { en: "Astronaut Self-Control Aircraft", zh: "宇航员自控飞机" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D8M*H4.9M (Including Fence)", zh: "直径8M*高4.9M (含围栏)" },
    height: { en: "4.9 m", zh: "4.9米" },
    riders: "12",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 22.jpeg",
  },
  {
    name: { en: "MOE DUCK LAND", zh: "萌鸭乐园" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L15M*W8.5M () (Including Fence)", zh: "长15M*宽8.5M (含围栏)" },
    height: { en: "N/A", zh: "N/A" },
    riders: "12",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 23.jpeg",
  },
  {
    name: { en: "PET WARS CLIMBING CAR", zh: "宠物作战儿童爬山车)" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L16M*W10M (Including Fence)", zh: "长16M*宽10M (含围栏)" },
    height: { en: "N/A", zh: "N/A" },
    riders: "30",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 24.jpeg",
  },
  {
    name: { en: "MAGIC CASTLE WATER RAFTING", zh: "童话城堡水道漂流" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L150M*W50M*H0.9M (L150M*W50M*H0.9M)", zh: "长150M*宽50M*高0.9M (L150M*W50M*H0.9M)" },
    height: { en: "0.9 m", zh: "0.9米" },
    riders: "N/A",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 25.jpeg",
  },
  {
    name: { en: "FANTASY STAR INTERNET CELEBRITY SWING", zh: "梦幻星网红秋千" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L8M*W7M*H6M (Including Fence)", zh: "长8M*宽7M*高6M (含围栏)" },
    height: { en: "6 m", zh: "6米" },
    riders: "20",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 26.jpeg",
  },
  {
    name: { en: "OFF ROAD VEHICLE", zh: "越野战车 OFF-ROAD VEHICLE" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D10M*H5.5M (Including Fence)", zh: "直径10M*高5.5M (含围栏)" },
    height: { en: "5.5 m", zh: "5.5米" },
    riders: "24",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 27.jpeg",
  },
  {
    name: { en: "Spinning Ferris Wheel", zh: "旋转飞椅" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D8M*H7.2M () (Including Fence)", zh: "直径8M*高7.2M (含围栏)" },
    height: { en: "7.2 m", zh: "7.2米" },
    riders: "24",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 28.jpeg",
  },
  {
    name: { en: "MOE DUCK LAND", zh: "喷球车" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D7M*H6M (Including Fence)", zh: "直径7M*高6M (含围栏)" },
    height: { en: "6 m", zh: "6米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 29.jpeg",
  },
  {
    name: { en: "Rotating Matrix - Model 2", zh: "旋转矩阵 - 型号2" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D9M*H6.7M (Including Fence)", zh: "直径9M*高6.7M (含围栏)" },
    height: { en: "6.7 m", zh: "6.7米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 3.jpeg",
  },
  {
    name: { en: "GLOBAL GLIDING", zh: "环球滑翔" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D10M*H6.3M (), H:1.98M (Including Fence)", zh: "直径10M*高6.3M (含围栏), 设备运行高度:1.98M" },
    height: { en: "6.3 m", zh: "6.3米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 30.jpeg",
  },
  {
    name: { en: "PIRATE SHIP", zh: "海盗船 PIRATE SHIP" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L6.5M*W4.5M*H4.5M(Including Fence)", zh: "长6.5M*宽4.5M*高4.5M(含围栏)" },
    height: { en: "4.5 m", zh: "4.5米" },
    riders: "12",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 31.jpeg",
  },
  {
    name: { en: "Interstellar Adventure Six-Person Trampoline", zh: "星际探险六人蹦床" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L7M*W6M*H5.6M", zh: "长7M*宽6M*高5.6M" },
    height: { en: "5.6 m", zh: "5.6米" },
    riders: "6",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 32.jpeg",
  },
  {
    name: { en: "MAGIC CASTLE WATER RAFTING", zh: "打地鼠儿童单人蹦床" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L1.9M*W2.3M*H3.7M", zh: "长1.9M*宽2.3M*高3.7M" },
    height: { en: "3.7 m", zh: "3.7米" },
    riders: "1",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 34.jpeg",
  },
  {
    name: { en: "KUPAO GO KART", zh: "酷跑卡丁车)" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L1.35M*W0.87M*H0.83M", zh: "长1.35M*宽0.87M*高0.83M" },
    height: { en: "0.83 m", zh: "0.83米" },
    riders: "1",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 35.jpeg",
  },
  {
    name: { en: "KODUCK MINI TRAIN", zh: "哒哒鸭小火车)" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L12M*W1.2M*H1.4-1.6M", zh: "长12M*宽1.2M*高1.4-1.6M" },
    height: { en: "N/A", zh: "N/A" },
    riders: "11",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 36.jpeg",
  },
  {
    name: { en: "SPACE MINI TRAIN", zh: "太空队小火车)" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L12M*W1.2M*H1.4", zh: "长12M*宽1.2M*高1.4" },
    height: { en: "N/A", zh: "N/A" },
    riders: "11",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 37.jpeg",
  },
  {
    name: { en: "WILD DRIFT BUMPER CAR", zh: "狂飙漂移碰碰车" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L 1.5M* W 0.9M* H 0.7M (L1.5M*W0.9M*H0.7M)", zh: "长 1.5M* 宽 0.9M* 高 0.7M (L1.5M*W0.9M*H0.7M)" },
    height: { en: "0.7 m", zh: "0.7米" },
    riders: "150",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 38.jpeg",
  },
  {
    name: { en: "TORNADO DRIFT BUMPER CAR", zh: "旋风漂移碰碰车" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "1.5M * 0.9M * 0.7M", zh: "1.5M * 0.9M * 0.7M" },
    height: { en: "N/A", zh: "N/A" },
    riders: "150",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 39.jpeg",
  },
  {
    name: { en: "Star Nucleus Explorer - Model 2", zh: "星核探险家 - 型号2" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D10M*H6.3M () (Including Fence)", zh: "直径10M*高6.3M (含围栏)" },
    height: { en: "6.3 m", zh: "6.3米" },
    riders: "16",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 4.jpeg",
  },
  {
    name: { en: "VICTORY DRIFT BUMPER CAR", zh: "赛赢漂移碰碰车" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L 1.5M* W 0.9M* H 0.7M (L1.5M*W0.9M*H0.7M)", zh: "长 1.5M* 宽 0.9M* 高 0.7M (L1.5M*W0.9M*H0.7M)" },
    height: { en: "0.7 m", zh: "0.7米" },
    riders: "150",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 41.jpeg",
  },
  {
    name: { en: "WIND DRIVEN DRIFT COLLISION CAR", zh: "风驰漂移碰碰车" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L 1.5M* W 0.9M* H 0.7M (L1.5M*W0.9M*H0.7M)", zh: "长 1.5M* 宽 0.9M* 高 0.7M (L1.5M*W0.9M*H0.7M)" },
    height: { en: "0.7 m", zh: "0.7米" },
    riders: "150",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 42.jpeg",
  },
  {
    name: { en: "MAIXUAN DRIFT COLLISION CAR", zh: "MAIXUAN DRIFT COLLISION CAR" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L1.7M*W1.1M*H0.95M", zh: "长1.7M*宽1.1M*高0.95M" },
    height: { en: "0.95 m", zh: "0.95米" },
    riders: "2",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 43.jpeg",
  },
  {
    name: { en: "TORNADO RACING CAR", zh: "旋风飞车" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L1.6M*W1.1M*H0.85M", zh: "长1.6M*宽1.1M*高0.85M" },
    height: { en: "0.85 m", zh: "0.85米" },
    riders: "2",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 44.jpeg",
  },
  {
    name: { en: "Q MOE RACING CAR", zh: "萌飞车" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L1.65M*W0.9M*H1.02M (L1.65M*W0.9M*H1.02M)", zh: "长1.65M*宽0.9M*高1.02M (L1.65M*W0.9M*H1.02M)" },
    height: { en: "1.02 m", zh: "1.02米" },
    riders: "2",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 45.jpeg",
  },
  {
    name: { en: "OFF ROAD TANK", zh: "越野战车" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L1.8M*W1.1M*H1.72M (L1.8M*W1.1M*H1.72M)", zh: "长1.8M*宽1.1M*高1.72M (L1.8M*W1.1M*H1.72M)" },
    height: { en: "1.72 m", zh: "1.72米" },
    riders: "2",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 46.jpeg",
  },
  {
    name: { en: "SUPER RACING CAR", zh: "急速飞车" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L1.7M*W1.1M*H0.95M", zh: "长1.7M*宽1.1M*高0.95M" },
    height: { en: "0.95 m", zh: "0.95米" },
    riders: "2",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 47.jpeg",
  },
  {
    name: { en: "BIG EYES RACING CAR", zh: "大眼酷飞车" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L1.7M*W1.1M*H1.08M", zh: "长1.7M*宽1.1M*高1.08M" },
    height: { en: "1.08 m", zh: "1.08米" },
    riders: "2",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 49.jpeg",
  },
  {
    name: { en: "Super Warrior - Model 2", zh: "超能战士 - 型号2" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "D9M*H6.3M () (Including Fence)", zh: "直径9M*高6.3M (含围栏)" },
    height: { en: "6.3 m", zh: "6.3米" },
    riders: "12",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 5.jpeg",
  },
  {
    name: { en: "Pendulum Play - Model 2", zh: "玩转钟摆 - 型号2" },
    category: { en: "Family Ride", zh: "家庭游乐设备" },
    footprint: { en: "L8M*W7M*H6M () (Including Fence)", zh: "长8M*宽7M*高6M (含围栏)" },
    height: { en: "6 m", zh: "6米" },
    riders: "20",
    status: "New",
    image: "/products/米盈游乐设备(1) [10-76] conv 9.jpeg",
  }
];

// Helper function to infer classification from product data (similar to Arrowy's approach)
function inferProductClassification(product: ProductMultilingual): {
  usage?: ProductUsage;
  venueType?: VenueType;
  targetAudience?: TargetAudience;
} {
  const idealFor = product.idealFor?.en || [];
  const idealForText = idealFor.join(" ").toLowerCase();
  const positioning = product.positioning?.en?.toLowerCase() || "";
  const combined = idealForText + " " + positioning;
  
  // Infer usage type
  let usage: ProductUsage | undefined = product.usage;
  if (!usage) {
    if (combined.includes("thrill") || combined.includes("extreme") || combined.includes("adrenaline") || combined.includes("刺激")) {
      usage = "Thrill Adventure";
    } else if (combined.includes("water") || combined.includes("aqua") || combined.includes("splash") || combined.includes("水上")) {
      usage = "Water Attraction";
    } else if (combined.includes("kid") || combined.includes("children") || combined.includes("儿童") || combined.includes("kiddie")) {
      usage = "Kiddie Fun";
    } else {
      usage = "Family Entertainment"; // Default
    }
  }
  
  // Infer venue type
  let venueType: VenueType | undefined = product.venueType;
  if (!venueType) {
    if (combined.includes("indoor") || combined.includes("室内")) {
      venueType = "Indoor";
    } else if (combined.includes("outdoor") || combined.includes("户外")) {
      venueType = "Outdoor";
    } else {
      venueType = "Both"; // Default
    }
  }
  
  // Infer target audience
  let targetAudience: TargetAudience | undefined = product.targetAudience;
  if (!targetAudience) {
    if (combined.includes("adult") || combined.includes("成人")) {
      targetAudience = "Adults";
    } else if (combined.includes("kid") || combined.includes("children") || combined.includes("儿童")) {
      targetAudience = "Kids";
    } else if (combined.includes("family") || combined.includes("家庭")) {
      targetAudience = "Family";
    } else {
      targetAudience = "All Ages"; // Default
    }
  }
  
  return { usage, venueType, targetAudience };
}

// Helper function to get localized product
export function getLocalizedProduct(product: ProductMultilingual, lang: Lang) {
  const isZh = lang === "zh";
  const classification = inferProductClassification(product);
  
  return {
    name: product.name[isZh ? "zh" : "en"] || product.name["en"],
    category: product.category[isZh ? "zh" : "en"] || product.category["en"],
    footprint: product.footprint[isZh ? "zh" : "en"] || product.footprint["en"],
    height: product.height[isZh ? "zh" : "en"] || product.height["en"],
    riders: product.riders,
    status: product.status,
    year: product.year,
    badge: product.badge,
    image: product.image,
    // Enhanced classification fields
    usage: classification.usage,
    venueType: classification.venueType,
    targetAudience: classification.targetAudience,
    // Decision-making fields
    positioning: product.positioning?.[isZh ? "zh" : "en"],
    idealFor: product.idealFor?.[isZh ? "zh" : "en"] || [],
    notRecommendedFor: product.notRecommendedFor?.[isZh ? "zh" : "en"] || [],
    venueRequirements: product.venueRequirements?.[isZh ? "zh" : "en"],
    powerSupply: product.powerSupply?.[isZh ? "zh" : "en"],
    safetyCompliance: product.safetyCompliance?.[isZh ? "zh" : "en"] || [],
    deliveryInstallation: product.deliveryInstallation?.[isZh ? "zh" : "en"] || [],
    afterSales: product.afterSales?.[isZh ? "zh" : "en"] || [],
    videoLinks: product.videoLinks,
    ctaText: product.ctaText?.[isZh ? "zh" : "en"],
  };
}

// Export products array for backward compatibility (defaults to English)
export const products = productsMultilingual.map(p => getLocalizedProduct(p, "en"));
