import type { Testimonial } from "./types/testimonial";

// Customer testimonials data
export const testimonials: Testimonial[] = [
  {
    id: "john-smith",
    name: "John Smith",
    company: "Theme Park Inc.",
    country: "USA",
    countryCode: "US",
    position: "Project Manager",
    rating: 5,
    text: "Miying delivered exceptional quality rides on time and within budget. Their team was professional throughout the entire process, from design consultation to final installation. Highly recommended!",
    textEn: "Miying delivered exceptional quality rides on time and within budget. Their team was professional throughout the entire process, from design consultation to final installation. Highly recommended!",
    textZh: "Miying 按时按预算交付了高质量的游乐设备。他们的团队在整个过程中都非常专业，从设计咨询到最终安装。强烈推荐！",
    project: "Theme Park Expansion",
    projectType: "Theme Park",
    year: "2023",
  },
  {
    id: "ahmed-al-mansoori",
    name: "Ahmed Al Mansoori",
    company: "Dubai Entertainment Group",
    country: "UAE",
    countryCode: "AE",
    position: "Operations Director",
    rating: 5,
    text: "The custom-designed rides from Miying exceeded our expectations. The installation was smooth, and the after-sales support has been excellent. Our visitors love the new attractions!",
    textEn: "The custom-designed rides from Miying exceeded our expectations. The installation was smooth, and the after-sales support has been excellent. Our visitors love the new attractions!",
    textZh: "Miying 的定制设计游乐设备超出了我们的期望。安装过程顺利，售后服务也非常出色。我们的游客非常喜欢这些新景点！",
    project: "Dubai Theme Park",
    projectType: "Theme Park",
    year: "2023",
  },
  {
    id: "li-wei",
    name: "Li Wei",
    company: "Shanghai Mall Group",
    country: "China",
    countryCode: "CN",
    position: "Facility Manager",
    rating: 5,
    text: "We've installed multiple rides from Miying in our shopping malls. The space-optimized designs are perfect for indoor environments, and the quality is consistently excellent.",
    textEn: "We've installed multiple rides from Miying in our shopping malls. The space-optimized designs are perfect for indoor environments, and the quality is consistently excellent.",
    textZh: "我们在购物中心安装了多台 Miying 的游乐设备。空间优化设计非常适合室内环境，质量始终如一。",
    project: "Shopping Mall Attractions",
    projectType: "Shopping Mall",
    year: "2024",
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    company: "Family Fun Centers",
    country: "USA",
    countryCode: "US",
    position: "CEO",
    rating: 5,
    text: "Miying's rides have been a great addition to our FEC chain. The family-friendly designs and reliable performance have helped increase our customer satisfaction significantly.",
    textEn: "Miying's rides have been a great addition to our FEC chain. The family-friendly designs and reliable performance have helped increase our customer satisfaction significantly.",
    textZh: "Miying 的游乐设备是我们 FEC 连锁店的绝佳补充。家庭友好的设计和可靠的性能显著提高了客户满意度。",
    project: "FEC Chain Expansion",
    projectType: "FEC",
    year: "2024",
  },
  {
    id: "tanaka-hiroshi",
    name: "Tanaka Hiroshi",
    company: "Tokyo Amusement Co.",
    country: "Japan",
    countryCode: "JP",
    position: "Technical Director",
    rating: 5,
    text: "The technical support from Miying is outstanding. They provided detailed installation guidance and continue to offer excellent after-sales service. The rides are performing perfectly.",
    textEn: "The technical support from Miying is outstanding. They provided detailed installation guidance and continue to offer excellent after-sales service. The rides are performing perfectly.",
    textZh: "Miying 的技术支持非常出色。他们提供了详细的安装指导，并持续提供优质的售后服务。设备运行完美。",
    project: "Tokyo Indoor Park",
    projectType: "Indoor Park",
    year: "2023",
  },
];

// Helper function to get localized testimonial
export function getLocalizedTestimonial(testimonial: Testimonial, lang: string): Testimonial {
  if (lang === "zh") {
    return {
      ...testimonial,
      text: testimonial.textZh || testimonial.text,
    };
  }
  return {
    ...testimonial,
    text: testimonial.textEn || testimonial.text,
  };
}











