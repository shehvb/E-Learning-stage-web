# 🍱 DashboardBento (Bento Grid Architecture & Dynamic Layout)
# توثيق شبكة لوحة التحكم (Bento Grid) والتوزيع الديناميكي للكروت

---

## 🇺🇸 English Documentation

### 1. Overview
The `DashboardBento` component is the structural backbone of the student dashboard. It orchestrates 7 independent interactive learning cards into a 3-tier Bento grid layout that automatically adapts to varying viewport dimensions, container queries, and aspect ratios.

It utilizes the **`dynamic-card-grid`** layout engine (`src/modules/dynamic-card-grid/`) which provides zero-gap fluid redistribution. When conditional or locked cards are inactive, active sibling cards automatically stretch to occupy 100% of the row width without leaving empty holes.

### 2. Architecture & Hierarchy
```
DashboardBento
├── Row 1: Top (DynamicCardRow: "top-row")
│   ├── DynamicCardSlot (ContinueLearning: flex 1.25fr)
│   ├── DynamicCardSlot (AILearningGuide: flex 1.55fr)
│   └── DynamicCardSlot (WeeklyGoalCard: flex 1fr)
│
├── Row 2: Middle (DynamicCardRow: "middle-row")
│   ├── DynamicCardSlot (MyProgress / NoSessionProgressCard: flex 1.1fr)
│   ├── DynamicCardSlot (Upcoming: flex 1fr)
│   └── DynamicCardSlot (YourStreak: flex 1.58fr)
│
└── Row 3: Bottom (dashboard-bento__row--bottom)
    └── RecommendedCourses (5-course catalog: 100% width)
```

### 3. Source File Location
- **Module Primitives**: `src/modules/dynamic-card-grid/`
  - `components/DynamicCardRow.tsx`: Fluid flex container with zero-gap distribution.
  - `components/DynamicCardSlot.tsx`: Animated container slot with `AnimatePresence` and `motion.div`.
  - `hooks/useConditionalCardState.ts`: Encapsulated card unlock & visibility rules.
- **Component TSX**: `src/features/student/components/DashboardBento/DashboardBento.tsx`
- **Stylesheet**: `src/features/student/components/DashboardBento/DashboardBento.css`

### 4. Key Design Decisions & Container Query System
- Every grid slot declares `container: bento-slot / size;` in CSS.
- Cards calculate internal paddings, font clamps, and element positions based on the exact pixel dimension of their individual slot, rather than window screen size.
- Framer Motion `layout` prop performs smooth FLIP animations when neighboring cards appear or unmount.
- Desktop resolutions maintain zero-scroll containment, while tablet/mobile viewports stack cleanly at `<= 820px`.

---

## 🇪🇬 التوثيق بالعربي المصري (Egyptian Arabic)

### 1. إيه هو الـ DashboardBento والنظام الديناميكي؟
مكون `DashboardBento` هو الهيكل الأساسي لصفحة الطالب. تم تحديثه ليعتمد على محرك `dynamic-card-grid` الذكي، بحيث لو فيه أي كارت مقفول أو مش متفعل للطالب الجديد، الكروت التانية المفتوحة بتفرد تلقائياً وتاخد عرض الصف كامل بنعومة وسلاسة ومن غير ما تسيب أي فراغ أو خانة فاضية في التصميم.

### 2. تقسيم الصفوف والكروت
- **الصف الأول (Top Row)**: كارت متابعة الدرس الحالي `ContinueLearning` (واخد 1.25fr) + كارت مرشد الذكاء الاصطناعي `AILearningGuide` (واخد 1.55fr) + كارت متابعة الهدف الأسبوعي `WeeklyGoalCard` (واخد 1fr).
- **الصف التاني (Middle Row)**: كارت قياس التقدم العام `MyProgress` (واخد 1.1fr) + كارت الحصص والمواعيد القادمة `Upcoming` (واخد 1fr) + كارت أيام التفاعل المتواصل `YourStreak` (واخد 1.58fr).
- **الصف التالت (Bottom Row)**: شريط الكورسات المقترحة `RecommendedCourses` بعرض الشاشة كامل.

### 3. سر التجاوب الذكي والحركة السلسة
كل خانة في الشبكة بتتعامل كـ Container مستقل باستخدام خاصية `@container bento-slot` في الـ CSS مع حركات Framer Motion التلقائية (`layout`) اللي بتضمن انكماش وتمدد الكروت عند فتح أي ميزة جديدة بدون قفزات مفاجئة في الشاشة.
