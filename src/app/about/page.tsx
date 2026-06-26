import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WebPageSchema from "@/components/WebPageSchema";

export const metadata = {
  title: "من نحن",
  description: "تعرف على قصة متجر شرّابي ومهمتنا في تقديم أفضل الجوارب المريحة والمانعة للتعرق في السعودية.",
};

export default function AboutPage() {
  return (
    <div className="w-full pb-20 pt-10">
      <WebPageSchema
        name="من نحن | شرّابي"
        description="تعرف على قصة متجر شرّابي ومهمتنا في تقديم أفضل الجوارب المريحة والمانعة للتعرق في السعودية."
        url="https://sharraby.com/about"
      />
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors w-max focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 pr-2 pl-4 -ml-2"
        >
          <ArrowRight className="w-4 h-4" />
          <span className="font-medium text-sm">العودة للرئيسية</span>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">من نحن</h1>

        <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed">
          <p>
            مرحباً بك في <strong>شرّابي</strong>، وجهتك الأولى للحصول على أفضل وأجود أنواع الجوارب في المملكة العربية السعودية.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">قصتنا</h2>
          <p>
            بدأت فكرة <strong>شرّابي</strong> من حاجة يومية بسيطة ولكنها ملحة: العثور على جوارب تجمع بين الراحة المطلقة، المتانة، والقدرة على التكيف مع أجواء المملكة. لاحظنا أن الكثير من الخيارات المتاحة إما تفتقر إلى الجودة وتتمزق سريعاً، أو تسبب التعرق والروائح غير المستحبة بسبب المواد الصناعية. لذلك، قررنا أخذ زمام المبادرة وتقديم بديل يغير مفهوم العناية بالقدمين.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">رؤيتنا</h2>
          <p>
            نسعى في شرّابي إلى الارتقاء بمعايير الراحة اليومية من خلال تقديم منتجات مبتكرة وعالية الجودة. رؤيتنا هي أن نصبح الخيار الأول والموثوق لكل شخص يبحث عن جوارب عملية، أنيقة، ومريحة في جميع أنحاء المملكة.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">ماذا نقدم؟</h2>
          <p>
            نحن متخصصون في نوعين رئيسيين من الجوارب التي تلبي احتياجاتك اليومية:
          </p>
          <ul>
            <li>
              <strong>جوارب نانو الفضة:</strong> صممت خصيصاً للتخلص من البكتيريا المسببة للروائح الكريهة. بفضل تقنية نانو الفضة المدمجة في نسيج الجورب، نضمن لك أقداماً منتعشة طوال اليوم مهما كانت التحديات.
            </li>
            <li>
              <strong>بكج التوفير القطني:</strong> لمحبي الراحة والعملية، نقدم جوارب مصنوعة من مزيج مثالي يتكون من 80% قطن طبيعي صافٍ يمتص العرق، و20% سباندكس لمرونة تتكيف مع حركة قدمك وتوفر دعماً ممتازاً.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">لماذا تختار شرّابي؟</h2>
          <ul>
            <li><strong>جودة لا تُضاهى:</strong> نختار أقمشتنا بعناية فائقة لتكون ناعمة على الجلد وتدوم طويلاً.</li>
            <li><strong>تصميم عملي:</strong> سُمك الجوارب مدروس بعناية ليكون مناسباً لأجوائنا، بحيث يوفر التهوية اللازمة دون المساس بالمتانة.</li>
            <li><strong>خدمة عملاء مميزة:</strong> نحن متواجدون دائماً للاستماع إلى استفساراتكم وضمان حصولكم على تجربة تسوق سلسة ومرضية.</li>
          </ul>

          <p className="mt-8">
            في <strong>شرّابي</strong>، نحن لا نبيع مجرد جوارب، بل نقدم لك خطوات مليئة بالراحة والثقة كل يوم.
          </p>
        </div>
      </div>
    </div>
  );
}
