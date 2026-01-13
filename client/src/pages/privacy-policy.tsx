import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-8" data-testid="button-back-home">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Privacy Policy
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground">
          <p>
            Careerskope.com respects your privacy. This Privacy Policy outlines the information we collect and how we use it. This Policy applies to the information collected through our website i.e. WWW.CAREERSKOPE.COM or any derivative pages thereof and mobile application services (hereinafter referred to as "Platform" or "Platform Services").
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Collection of Your Personal Information</h2>
          
          <p>
            We collect personal data that you voluntarily provide to us when registering on our Platform, expressing interest in obtaining information about us or our products and services, participating in activities on the Site (such as posting messages in our Online Chatbox), or otherwise by contacting us.
          </p>

          <p>
            If you browse through this site or any derivative pages thereof and the mobile application services without providing us with any personal information, we will gather and store some information about your visit, such as IP address, type of browser and operating system used, date and time you access our site and mobile services, pages you visit, and, if you linked to our website from another website, the address of that website. This information will not identify you personally and will not be linked back to you.
          </p>

          <p>
            Personal information (i.e. information which may identify you in some way, such as your name, address, age, other contact details such as telephone number, email address etc. and passwords) may be collected through the our website i.e. WWW.CAREERSKOPE.COM or any derivative pages thereof and mobile application services when the information is voluntarily submitted by you. This may be when you register on the website or on the mobile application services, request information for the purposes of a transaction, or apply to/become a member, subscriber or a participant thereon.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Use of Your Personal Information</h2>
          
          <p>Your personal information may be used as follows:</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>To respond to your questions and requests, to provide you with access to certain areas and features and to communicate with you about your activities on the website or any other derivative pages and the mobile application services;</li>
            <li>To share it with our Related Parties as required to perform functions on our behalf in connection with the Platform (such as delivery of services, administration of the website or promotions or other features on it, marketing, data analysis or customer services). To do so, it may be necessary for us to transmit your personal information to outside the applicable Jurisdiction and you agree to this transfer. Further use, or disclosure, of the information by them for other purposes is not permitted;</li>
            <li>To provide you with product information or promotional and other offers from us or our Related Parties;</li>
            <li>To provide you with tailored services on the Website's interface and mobile application services on the basis of the information provided by you;</li>
            <li>To enhance the website's and the mobile application's user interface and to improve overall experience in providing tailored services;</li>
            <li>For other purposes set out when your information is collected or in any additional terms and conditions applicable to the particular feature of the Site;</li>
            <li>For disclosures required by law, regulation or court order;</li>
            <li>For the purpose of or in connection with legal proceedings or necessary for establishing, defending or exercising legal rights;</li>
            <li>In an emergency to protect the health or safety of Site users or the general public or in the interests of national security;</li>
          </ul>

          <p>
            Except as provided in herein, we will not provide any of your personal information to any third parties without your specific consent.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Disclosures</h2>
          
          <p>
            We may disclose information about you to any of our employees, officers, agents, suppliers or subcontractors insofar as reasonably necessary for the purposes as set out in this privacy policy.
          </p>

          <p>In addition, we may disclose your personal information:</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>To the extent that we are required to do so by law;</li>
            <li>In connection with any legal proceedings or prospective legal proceedings;</li>
            <li>In order to establish, exercise or defend our legal rights (including providing information to others for the purposes of fraud prevention and reducing credit risk);</li>
            <li>To the purchaser (or prospective purchaser) of any business or asset which we are (or are contemplating) selling;</li>
            <li>To any person who we reasonably believe may apply to a court or other competent authority for disclosure of that personal information where, in our reasonable opinion, such court or authority would be reasonably likely to order disclosure of that personal information.</li>
          </ul>

          <p>
            Except as provided in this privacy policy, we will not provide your information to third parties.
          </p>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2025 Careerskope. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
