const menuConfig = [
  { label: "Dashboard", path: "/" },
  { label: "Posts", path: "/post" },
  {
    label: "Products",
    submenu: [
      { label: "Add Products", path: "/products/add-products" },
      { label: "All Products", path: "/products/all-products" },
    ],
  },
];

export default menuConfig;
