import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WebPageSchema from "@/components/WebPageSchema";

export const metadata = {
  title: "الشروط والأحكام",
  description: "الشروط والأحكام لمتجر شرّابي.",
};

export default function TermsPage() {
  return (
    <div className="w-full pb-20 pt-10">
      <WebPageSchema
        name="الشروط والأحكام | شرّابي"
        description="الشروط والأحكام لمتجر شرّابي."
        url="https://sharraby.com/terms"
      />
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors w-max focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 pr-2 pl-4 -ml-2"
        >
          <ArrowRight className="w-4 h-4" />
          <span className="font-medium text-sm">العودة للرئيسية</span>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">الشروط والأحكام</h1>

        <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed">
          <p>
            مرحباً بكم في متجر شرّابي. باستخدامك لهذا الموقع، فإنك توافق على الالتزام بالشروط والأحكام التالية، لذا يرجى قراءتها بعناية قبل استخدام الموقع.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">قبول الشروط</h2>
          <p>
            بوصولك إلى الموقع واستخدامه، فإنك توافق على الالتزام بكافة هذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">المنتجات والأسعار</h2>
          <p>
            نحتفظ بالحق في تعديل الأسعار وعروض المنتجات في أي وقت دون إشعار مسبق. جميع المنتجات المعروضة تخضع لتوفرها في المخزون.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">الدفع والطلبات</h2>
          <p>
            الدفع متاح عبر الإنترنت، كما نوفر خدمة الدفع عند الاستلام لعملائنا في مدينة الرياض فقط. للطلبات خارج الرياض، يجب أن يكون الدفع مسبقاً عبر متجرنا الرئيسي. يحق لنا رفض أو إلغاء أي طلب لعدة أسباب، مثل عدم توفر المنتج، أو اكتشاف خطأ في السعر.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">حقوق الملكية الفكرية</h2>
          <p>
            جميع المحتويات المعروضة في الموقع، بما في ذلك النصوص، الصور، والشعارات هي ملكية حصرية لمتجر شرّابي ومحمية بموجب حقوق النشر.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">التعديلات على الشروط</h2>
          <p>
            يحتفظ متجر شرّابي بالحق في تغيير هذه الشروط والأحكام من وقت لآخر، ويعتبر استمرار استخدامك للموقع بعد نشر التغييرات موافقة منك عليها.
          </p>
        </div>
      </div>
    </div>
  );
}
