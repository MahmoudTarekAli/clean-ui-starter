export const getMenuData: any[] = [
  // VB:REPLACE-START:MENU-CONFIG
  {
    title: 'Companies',
    key: 'Companies',
    icon: 'fe fe-home',
    children: [
      {
        title: 'Companies',
        key: 'companies',
        url: `/companies`,
      },
    ],
  },
  {
    title: 'Inventory Management',
    key: 'Inventory Management',
    icon: 'fe fe-home',
    children: [
      {
        title: 'Inventories',
        key: 'Inventory',
        url: `/inventories`,
      },
      {
        title: 'Add Inventory',
        key: 'pending request',
        url: `/inventories/add-inventory`,
      },
    ],
  },

  // VB:REPLACE-END:MENU-CONFIG
]
