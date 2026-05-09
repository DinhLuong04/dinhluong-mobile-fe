# E-commerce Shop Project Documentation

## Tổng quan dự án
Đây là một ứng dụng e-commerce được xây dựng bằng React 19, TypeScript, và Vite. Sử dụng Ant Design cho UI components, Twind (Tailwind CSS) cho styling, và các thư viện khác như React Router DOM, Axios, v.v.

## Cấu trúc dự án

### Root Level
- `package.json`: Dependencies và scripts. Sử dụng React 19, TypeScript, Vite, Ant Design, Twind.
- `tsconfig.json`: Cấu hình TypeScript composite, tham chiếu đến app và node configs.
- `vite.config.ts`: Cấu hình Vite build tool.
- `eslint.config.js`: Cấu hình ESLint.
- `vercel.json`: Cấu hình deployment cho Vercel.

### Thư mục `src/`
Chứa toàn bộ source code của ứng dụng.

#### `api/`
- `axiosClient.ts`: Cấu hình Axios client cho API calls.

#### `assets/`
- `variables.css`: CSS variables.
- `RegisterHeader.css`: Styles cho register header.

#### `components/`
Chứa các reusable components, được tổ chức theo feature hoặc type.

- **Account/**: Components liên quan đến tài khoản người dùng (Header, Layout, Nav, Sidebar, OrderDetail, OrderHistory, Overview, Profile, Voucher, VoucherCenter).
- **Banner/**: Banner component.
- **BrandSlider/**: Slider cho brands.
- **Cart/**: Components cho giỏ hàng (Breadcrumb, CartAlert, CartItem, OrderSummary, QuantityInput).
- **Category/**: Category component.
- **Chatbot/**: Chatbot component.
- **Checkout/**: Components cho checkout (Icons, CheckoutForms, CheckoutSummary, DeliveryForm, OrderItem, PaymentMethod).
- **Common/**: Common components (BackToHomeButton, ConfirmModal, MobileBottomNav, ReplyBox, ReviewModal).
- **CompareProduct/**: Components cho so sánh sản phẩm.
- **Conclusion/**: Conclusion component.
- **ContactFloating/**: Floating contact button.
- **EmptySearch/**: Empty search state.
- **Fillter/** (Rename to Filter): Filter component cho sản phẩm.
- **Footter/** (Rename to Footer): Footer component.
- **Header/**: Header components (TopHeader, SearchBar, Logo, v.v.).
- **LiveChat/**: Live chat component.
- **PolicySection/**: Policy sections.
- **ProductDetail/**: Components cho chi tiết sản phẩm.
- **Products/**: Components cho danh sách sản phẩm.
- **RegisterHeader/**: Header cho register page.
- **StickyCompareBar/**: Sticky bar cho compare.
- **VoucherModal/**: Modal cho voucher.

#### `config/`
- `api.config.ts`: Cấu hình API endpoints.

#### `contexts/`
- `AuthContext.tsx`: Context cho authentication.
- `ChatContext.tsx`: Context cho chat.
- `CompareContext.tsx`: Context cho compare products.

#### `hooks/`
- `useDebounce.ts`: Custom hook cho debounce.

#### `layouts/`
- `AdminLayout/`: Layout cho admin pages.
- `MainLayout/`: Layout chính cho public pages.
- `RegisterLayout/`: Layout cho register/login pages.

#### `pages/`
Chứa các page components.

- **Account/**: Member page.
- **Admin/**: Admin pages (Dashboard, OrderManager, ProductManager, v.v.).
- **Cart/**: CartPage.
- **Checkout/**: Checkout page.
- **CompareProduct/**: CompareProduct page.
- **ForgotPasswordPage/**: Forgot password page.
- **HomePage/**: Home page.
- **Login/**: Login page.
- **PaymentResult/**: Payment result page.
- **ProductDetail/**: Product detail page.
- **Register/**: Register page.
- **SearchPage/**: Search page.

#### `provider/`
- `AuthProvider.tsx`: Provider cho AuthContext.
- `ChatProvider.tsx`: Provider cho ChatContext.
- `CompareProvider.tsx`: Provider cho CompareContext.

#### `routes/`
- `useRouteElements.tsx`: Định nghĩa routes sử dụng React Router.
- `AdminProtectedRoute.tsx`: Protected route cho admin.
- `UserProtectedRoute.tsx`: Protected route cho user.

#### `service/`
- `authService.ts`: Service cho authentication (login, register, v.v.).
- `cartService.ts`: Service cho cart operations.
- `productService.ts`: Service cho product operations.

#### `types/`
- `auth.types.ts`: TypeScript types cho auth.
- `menuData.ts`: Data cho menu.
- `Product.types.ts`: Types cho products.
- `types.d.ts`: Global type definitions.

#### `utils/`
- `viewedProductHelper.ts`: Utility cho viewed products.

## Phân chia gói (Packages/Modules)

Dự án được tổ chức theo cấu trúc feature-based và type-based hybrid:

1. **Core/App Layer**: `App.tsx`, `main.tsx`, `routes/`, `layouts/`
2. **Business Logic**: `pages/`, `components/` (theo feature)
3. **Data Layer**: `api/`, `service/`, `config/`
4. **State Management**: `contexts/`, `provider/`
5. **Utilities**: `hooks/`, `utils/`, `types/`

## Ghi chú Refactor (Senior Dev Perspective)

### 1. Naming Conventions
- **Fillter** → **Filter**: Rename thư mục và file để đúng chính tả.
- **Footter** → **Footer**: Tương tự.
- Đảm bảo consistency: tất cả component names PascalCase, files kebab-case hoặc PascalCase.

### 2. Code Quality Issues
- **Remove console.log**: Có 5 instances console.log trong code (Login.tsx, VoucherManager.tsx, ProductHot.tsx, Section1.tsx, ProductCard.tsx). Remove hoặc replace với proper logging.
- **Error Handling**: Trong authService, throw Error nhưng không consistent. Sử dụng custom error classes hoặc standardized error handling.
- **Type Safety**: Đảm bảo tất cả props, state có types. Một số components có thể thiếu types.

### 3. Architecture Improvements
- **Feature-Based Structure**: Hiện tại hybrid type-based/feature-based. Refactor để fully feature-based: group components, pages, services theo feature (e.g., `features/auth/`, `features/products/`, `features/cart/`).
- **Atomic Design**: Components có thể được tổ chức theo atomic design (atoms, molecules, organisms).
- **Custom Hooks**: Tách logic từ components vào custom hooks để reusable.
- **Context Optimization**: Sử dụng useReducer cho complex state thay vì multiple useState.

### 4. Performance
- **Lazy Loading**: Implement lazy loading cho routes và components lớn.
- **Memoization**: Sử dụng React.memo, useMemo, useCallback cho components và computations.
- **Image Optimization**: Implement lazy loading cho images.

### 5. Security
- **Environment Variables**: Đảm bảo tất cả sensitive data (API keys, client IDs) trong .env.
- **Input Validation**: Thêm validation cho forms sử dụng libraries như Yup hoặc Zod.

### 6. Testing
- **Unit Tests**: Thêm tests cho components, services sử dụng Jest/Vitest.
- **Integration Tests**: Tests cho user flows.

### 7. Documentation
- **README.md**: Cập nhật với setup instructions, architecture overview.
- **Component Docs**: Thêm JSDoc hoặc Storybook cho components.

### 8. Build & Deployment
- **CI/CD**: Thêm GitHub Actions cho automated testing và deployment.
- **Bundle Analysis**: Optimize bundle size.

### 9. Accessibility
- **ARIA Labels**: Thêm ARIA attributes cho better accessibility.
- **Keyboard Navigation**: Đảm bảo navigation works với keyboard.

### 10. Internationalization (i18n)
- **Localization**: Thêm support cho multiple languages sử dụng react-i18next.

## Kết luận
Dự án có cấu trúc cơ bản tốt, nhưng cần refactor để professional, maintainable. Ưu tiên naming fixes, remove debug code, và chuyển sang feature-based architecture.