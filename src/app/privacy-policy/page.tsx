import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WebPageSchema from "@/components/WebPageSchema";

export const metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية لمتجر شرّابي.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full pb-20 pt-10">
      <WebPageSchema
        name="سياسة الخصوصية | شرّابي"
        description="سياسة الخصوصية لمتجر شرّابي."
        url="https://sharraby.com/privacy-policy"
      />
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors w-max focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 pr-2 pl-4 -ml-2"
        >
          <ArrowRight className="w-4 h-4" />
          <span className="font-medium text-sm">العودة للرئيسية</span>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">سياسة الخصوصية</h1>

        <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed">
          <p>
            في متجر شرّابي، نولي اهتماماً كبيراً لخصوصية زوارنا وعملائنا. توضح سياسة الخصوصية هذه نوع المعلومات الشخصية التي نتلقاها ونجمعها وكيفية استخدامها.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">جمع المعلومات</h2>
          <p>
            نقوم بجمع بعض المعلومات عند زيارتك للمتجر أو إتمام طلب، مثل الاسم، العنوان، رقم الهاتف، والبريد الإلكتروني، وذلك بهدف إتمام ومعالجة الطلبات والتواصل معك بشأنها.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">استخدام المعلومات</h2>
          <p>
            نستخدم المعلومات التي نجمعها لتحسين تجربتك في الموقع، لتسريع عملية إتمام الطلبات، ولتزويدك بأحدث العروض والمنتجات إذا كنت قد اشتركت في قائمتنا البريدية.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">حماية المعلومات</h2>
          <p>
            نحن نتخذ الإجراءات الأمنية المناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف. لا نقوم ببيع أو تأجير أو مشاركة معلوماتك الشخصية مع أي أطراف ثالثة إلا لغرض إتمام الشحن والتوصيل.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">ملفات تعريف الارتباط (Cookies)</h2>
          <p>
            قد نستخدم ملفات تعريف الارتباط لتحسين وتخصيص تجربة المستخدم وتتبع التفضيلات. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك.
          </p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">تحديثات سياسة الخصوصية</h2>
          <p>
            يحتفظ متجر شرّابي بالحق في تحديث أو تغيير سياسة الخصوصية في أي وقت، وسيتم نشر التعديلات في هذه الصفحة.
          </p>
        </div>
      </div>
    </div>
  );
}
