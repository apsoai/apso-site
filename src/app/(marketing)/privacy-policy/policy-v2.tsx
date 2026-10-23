import type { PolicySection } from "./page";

// Rewritten policy from the redesign. Counsel reviews it before it ships; the bracketed
// placeholders below must be filled in first. Enable with NEXT_PUBLIC_PRIVACY_V2=1.
export const updated = "[date of counsel review]";

export const intro = null;

const purposes = [
  ["Provide and run Apso, including your account, workspaces, and deployments", "Contract"],
  ["Process payments and send billing and service email", "Contract, legal obligation"],
  ["Understand usage and improve the product", "Legitimate interests"],
  ["Keep Apso secure and investigate errors", "Legitimate interests"],
  ["Answer support requests and calls you book", "Contract, legitimate interests"],
  ["Meet tax and legal obligations", "Legal obligation"],
];

const providers = [
  ["Amazon Web Services", "Hosting, databases, and deployed services"],
  ["Stripe", "Payments and invoices"],
  ["Resend", "Account and billing email"],
  ["PostHog", "Product analytics"],
  ["Sentry", "Error monitoring"],
  ["Pusher", "Live deploy status in the app"],
  ["GitHub and Google", "Sign-in, when you choose it"],
  ["Anthropic and OpenAI", "The schema assistant (see AI features)"],
];

function Table({ head, rows }: { head: [string, string]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-line-1 text-[14px]">
      <table className="w-full border-collapse text-left">
        <thead className="bg-bg-1 font-semibold text-fg-1">
          <tr className="border-b border-line-1">
            <th className="w-1/2 px-4 py-3 font-semibold sm:w-[62%]">{head[0]}</th>
            <th className="px-4 py-3 font-semibold">{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a} className="border-b border-line-1 align-top last:border-b-0">
              <td className="px-4 py-3 font-medium text-fg-1">{a}</td>
              <td className="px-4 py-3 text-fg-3">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const sections: PolicySection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        Mavric Technology, LLC (&quot;Mavric,&quot; &quot;we,&quot; or &quot;us&quot;) operates Apso, including apso.ai, app.apso.cloud, and related services. Mavric is the controller of the personal information described here. Contact us at privacy@mavric.tech or [mailing address].
      </p>
    ),
  },
  {
    id: "information",
    title: "Information we collect",
    body: (
      <>
        <p>Account and contact details you give us: your name, email address, and company, when you create an account, contact us, or book a call.</p>
        <p>Sign-in details: when you sign in with GitHub or Google, we receive the name, email address, and profile image you allow that provider to share.</p>
        <p>Content you create: the schemas, prompts, generated code, and settings in your workspaces.</p>
        <p>Billing details: Stripe collects your payment card. We receive the card brand, last four digits, and billing address, not the full card number.</p>
        <p>Usage and device information: pages visited, features used, browser type, IP address, and device information, collected through PostHog and our servers.</p>
      </>
    ),
  },
  {
    id: "use",
    title: "How we use it and why",
    body: (
      <>
        <p>For visitors in the EU, UK, and Switzerland, the right-hand column is the legal basis we rely on.</p>
        <Table head={["What we use it for", "Legal basis"]} rows={purposes} />
      </>
    ),
  },
  {
    id: "providers",
    title: "Service providers",
    body: (
      <>
        <p>We do not sell your personal information, and we do not share it for cross-context behavioral advertising. These providers process it on our behalf, under contracts that limit them to what their job needs.</p>
        <Table head={["Provider", "What it does for Apso"]} rows={providers} />
        <p className="text-[16px] leading-[1.7]">The full list, with where each provider processes data, is at apso.ai/subprocessors. We update that page before we add a provider.</p>
      </>
    ),
  },
  {
    id: "ai",
    title: "AI features",
    body: (
      <p>
        When you use the schema assistant, the text you type and the schema it is working on are sent to Anthropic or OpenAI to generate a response. Both process it under their commercial API terms: neither trains its models on API data by default. Anthropic deletes API inputs and outputs within 30 days. OpenAI keeps API data for up to 30 days for abuse monitoring. Either can keep flagged content longer to enforce its usage policy or when the law requires it.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: (
      <p>
        We set one cookie, to keep you signed in. Our analytics do not use cookies or browser storage: on apso.ai, PostHog runs in cookieless mode, and in the app it keeps nothing in your browser between visits.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <p>
        We keep account information while your account is open, and delete it within 30 days after you close it. Billing records are kept as long as tax law requires. Usage analytics are kept for [PostHog plan retention, from the dashboard]. Error reports are kept for [Sentry plan retention, from the dashboard]. Workspace content is deleted when you delete the service, workspace, or account.
      </p>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    body: (
      <p>
        Apso is operated from the United States, and our providers process data there: AWS in its us-east-1 region and PostHog in its US cloud. If you are in the EU, UK, or Switzerland, we transfer your information to the United States under the Standard Contractual Clauses in each provider&apos;s data processing agreement.
      </p>
    ),
  },
  {
    id: "code",
    title: "Your code and application data",
    body: (
      <p>
        Code generated by Apso belongs to you. Application data in deployed services is processed according to the infrastructure model and services you select. We use access controls and operational procedures intended to limit access to what is required to provide and support the service.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We use administrative, technical, and organizational safeguards intended to protect information, including encryption in transit, encryption at rest where supported by the underlying service, and controlled credential storage. No method of transmission or storage can guarantee complete security.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your rights",
    body: (
      <>
        <p>Everyone: you can ask to access, correct, export, or delete your personal information, and close your account at any time.</p>
        <p>EU, UK, and Switzerland: you can also object to or restrict processing based on legitimate interests, and complain to your local data protection authority.</p>
        <p>
          California and other US states with privacy laws: you have the right to know, correct, and delete, and to opt out of sale or sharing. We do not sell or share personal information, so there is nothing to opt out of. We will not treat you differently for using these rights.
        </p>
        <p>
          Ask by email at privacy@mavric.tech or through the <a href="/contact">contact form</a>. We confirm who you are before acting, and we respond within one month.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        Apso is not directed to children under 16, and we do not knowingly collect their personal information. If you believe a child has given us information, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    body: (
      <p>
        We may update this policy as the service changes. We post the revised policy here and update the date at the top. For material changes, we email account owners before the change takes effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Email privacy@mavric.tech, use the <a href="/contact">contact form</a>, or write to Mavric Technology, LLC, [mailing address].
      </p>
    ),
  },
];
