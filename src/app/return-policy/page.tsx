import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WebPageSchema from "@/components/WebPageSchema";

export const metadata = {
  title: "سياسة الاسترجاع",
  description: "سياسة الاسترجاع والاستبدال في متجر شرّابي.",
};

export default function ReturnPolicyPage() {
  return (
    <div className="w-full pb-20 pt-10">
      <WebPageSchema
        name="سياسة الاسترجاع | شرّابي"
        description="سياسة الاسترجاع في متجر شرّابي."
        url="https://sharraby.com/return-policy"
      />
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors w-max focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 pr-2 pl-4 -ml-2"
        >
          <ArrowRight className="w-4 h-4" />
          <span className="font-medium text-sm">العودة للرئيسية</span>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">سياسة الاسترجاع</h1>

        <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed">
          <p>
            رضا عملائنا هو أولويتنا القصوى في متجر شرّابي، ولضمان تجربة تسوق مريحة، وضعنا سياسة استرجاع واضحة ومرنة.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">جوارب نانو الفضة</h2>
          <p>
            نقدم ضماناً ذهبياً خاصاً بـ (جوارب نانو الفضة) فقط: يحق للعميل تجربة زوج واحد خلال 3 أيام من استلام الطلب. إذا لم تعجبك الجودة يمكنك استرجاع المبلغ. يشترط في هذه الحالة أن تكون باقي الجوارب في حالتها الأصلية ولم يتم فتحها أو استخدامها.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">جوارب القطن (بكج التوفير)</h2>
          <p>
            نظراً لطبيعة المنتجات وحفاظاً على الصحة العامة، لا يشمل الاسترجاع والاستبدال جوارب القطن (بكج التوفير).
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">المنتجات التالفة أو الخاطئة</h2>
          <p>
            في حال وصول منتج تالف أو مختلف عن طلبك الأساسي، يرجى التواصل معنا فوراً وسنقوم باستبداله أو إرجاعه وتحمل كافة تكاليف الشحن.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">طريقة تقديم طلب استرجاع</h2>
          <p>
            يمكنك تقديم طلب الاسترجاع عن طريق التواصل معنا عبر خدمة العملاء (واتساب) وسيقوم فريقنا بمتابعة طلبك وإرشادك للخطوات اللازمة.
          </p>
        </div>
      </div>
    </div>
  );
}
