/**
 * SITE CONFIG – chỉnh tại đây để tùy biến toàn bộ trang (không cần sửa index.html).
 * - Text:  <span data-cfg="contact.hotlineDisplay">
 * - Link:  <a data-cfg-href="tel:{contact.hotline}">
 * - Ảnh:   <img data-cfg-src="brand.logo">
 *
 * Phong cách: Soft UI Evolution
 *   Chính #E8B4B8 (rose-300) · Phụ #A8D5BA (sage-300) · CTA #D4AF37 (gold-500)
 *   Nền #FFF5F5 (rose-50) · Văn bản #2D3436 (stone-900)
 * Lưu ý: gold-600..900 là bản đậm hơn của vàng kim, dùng cho CHỮ trên nền sáng (đạt tương phản 4.5:1).
 */
window.SITE_CONFIG = {
  brand: {
    name: "Trăng Vàng",
    nameEn: "Golden Moon",
    legalName: "Công ty TNHH SX TM Trăng Vàng",
    initials: "assets/images/hero/favicon.png",
    slogan: "Chất lượng tạo nên giá trị",
    favicon: "assets/images/hero/favicon.png",
    banner: "assets/images/hero/banner.png",
    copyrightYear: "2025",
  },

  contact: {
    hotline: "0383122964", // dùng cho tel: và zalo.me
    hotlineDisplay: "0383122964",
    hotline2: "0383122964",
    hotline2Display: "0383122964",
    email: "",
    address: "26/1A Trần Quý Cáp, Phường Bình Lợi Trung, TP.HCM",
    addressShort: "26/1A Trần Quý Cáp, P. Bình Lợi Trung, TP.HCM",
    workingHours: "Thứ 2 – Chủ nhật",
    workingHoursFull: "Thứ 2 – Chủ nhật (Cả tuần)",
    zaloUrl: "https://zalo.me/0383122964",
    messengerUrl: "https://m.me/tinhdautrangvang",
  },

  fonts: {
    heading: "Cormorant Garamond", // tiêu đề (font-serif)
    body: "Montserrat", // nội dung (font-sans)
    // Tham số Google Fonts; đổi font thì đổi cả weights tương ứng
    headingSpec: "ital,wght@0,400;0,500;0,600;0,700;1,400;1,600",
    bodySpec: "wght@300;400;500;600;700",
  },

  colors: {
    gold: {
      // CTA – vàng kim
      50: "#fcf8ea",
      100: "#f8f0d5",
      200: "#f2e5b5",
      300: "#ead58a",
      400: "#e0c262",
      500: "#d4af37",
      600: "#a8841a",
      700: "#7f6409",
      800: "#5f4a07",
      900: "#463605",
    },
    rose: {
      // chính – hồng nhạt / nền
      50: "#fff5f5",
      100: "#fbe9ea",
      200: "#f5d3d6",
      300: "#e8b4b8",
      400: "#de9aa0",
    },
    sage: {
      // phụ – xanh xô thơm
      50: "#f3f9f5",
      100: "#e3f1e8",
      200: "#cde7d6",
      300: "#a8d5ba",
      400: "#8cc5a3",
    },
    stone: {
      // văn bản / trung tính (900 = #2D3436)
      50: "#faf7f6",
      100: "#f3efee",
      200: "#e6e0df",
      300: "#d3cccb",
      400: "#a29b9b",
      500: "#6b6666",
      600: "#555051",
      700: "#403c3d",
      800: "#363637",
      900: "#2d3436",
      950: "#232829",
    },
    zalo: "#FFFFFF",
    messenger: "#0084FF",
    call: "#15803d",
  },

  // Bóng đổ mềm (Soft UI)
  shadows: {
    soft: "0 8px 24px rgba(45,52,54,.07), 0 2px 6px rgba(45,52,54,.04), inset 0 1px 0 rgba(255,255,255,.7)",
    softLg: "0 18px 44px rgba(45,52,54,.11), 0 4px 10px rgba(45,52,54,.05)",
  },
};
