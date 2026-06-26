import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WebPageSchema from "@/components/WebPageSchema";

export const metadata = {
  title: "سياسة الشحن والتوصيل",
  description: "سياسة الشحن والتوصيل في متجر شرّابي.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="w-full pb-20 pt-10">
      <WebPageSchema
        name="سياسة الشحن | شرّابي"
        description="سياسة الشحن والتوصيل في متجر شرّابي."
        url="https://sharraby.com/shipping-policy"
      />
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors w-max focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 pr-2 pl-4 -ml-2"
        >
          <ArrowRight className="w-4 h-4" />
          <span className="font-medium text-sm">العودة للرئيسية</span>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">سياسة الشحن والتوصيل</h1>

        <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed">
          <p>
            نحرص في متجر شرّابي على تقديم أفضل خدمة شحن وتوصيل لعملائنا لضمان وصول طلباتكم بأسرع وقت ممكن وبأفضل حالة.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">مناطق التوصيل</h2>
          <p>
            نقدم خدمة التوصيل المباشر لعملائنا في مدينة الرياض فقط في الوقت الحالي. 
            للطلبات من خارج مدينة الرياض، يرجى الطلب عبر متجرنا الرئيسي: <a href="https://sharraby.me" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">sharraby.me</a>، علماً بأن الدفع للطلبات خارج الرياض يكون بشكل مسبق.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">مدة التوصيل</h2>
          <p>
            تستغرق عملية التوصيل داخل مدينة الرياض من 24 إلى 48 ساعة كحد أقصى من تاريخ تأكيد الطلب.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">رسوم الشحن</h2>
          <p>
            نوفر شحناً مجانياً لجميع الطلبات التي تتجاوز قيمتها 99 ريال سعودي.
            أما الطلبات التي تقل عن 99 ريال سعودي، فيضاف عليها رسوم شحن رمزية تعتمد على وسيلة الشحن المتاحة في صفحة الدفع.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">تتبع الطلبات</h2>
          <p>
            بمجرد إتمام طلبك، سيتم تزويدك برقم تتبع أو رسالة تأكيد عبر الواتساب أو الرسائل النصية تتيح لك متابعة حالة طلبك حتى وصوله إليك.
          </p>
        </div>
      </div>
    </div>
  );
}
