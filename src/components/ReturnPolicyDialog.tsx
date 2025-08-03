import React from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface ReturnPolicyDialogProps {
  children: React.ReactNode;
}

const ReturnPolicyDialog = ({ children }: ReturnPolicyDialogProps) => {
  const t = useTranslations("Footer");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("returnPolicy", { defaultValue: "Return Policy" })}
          </DialogTitle>
          <DialogDescription>
            {t("returnPolicyDescription", {
              defaultValue:
                "Our return policy ensures customer satisfaction with clear guidelines for returns and exchanges.",
            })}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Warranty Section */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4">
              {t("warrantyTitle", { defaultValue: "Warranty Policy" })}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t("warrantyDescription", {
                defaultValue:
                  "Our warranty policy covers manufacturing defects and ensures product quality for 5 years.",
              })}
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-lg mb-2">
                  {t("warrantyIncludes", {
                    defaultValue: "Warranty Includes:",
                  })}
                </h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>
                    •{" "}
                    {t("warrantyIncludes1", {
                      defaultValue: "Abnormal color change of the film",
                    })}
                  </li>
                  <li>
                    •{" "}
                    {t("warrantyIncludes2", {
                      defaultValue: "Peeling or cracking of the outer layer",
                    })}
                  </li>
                  <li>
                    •{" "}
                    {t("warrantyIncludes3", {
                      defaultValue:
                        "Loss of thermal insulation properties (proven)",
                    })}
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-lg mb-2">
                  {t("warrantyDuration", {
                    defaultValue: "Warranty Duration:",
                  })}
                </h4>
                <p className="text-muted-foreground">
                  {t("warrantyDurationText", {
                    defaultValue: "5 years from the date of purchase",
                  })}
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-lg mb-2">
                  {t("warrantyExcludes", {
                    defaultValue: "Warranty Excludes:",
                  })}
                </h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>
                    •{" "}
                    {t("warrantyExcludes1", {
                      defaultValue:
                        "Improper installation or damage from misuse",
                    })}
                  </li>
                  <li>
                    •{" "}
                    {t("warrantyExcludes2", {
                      defaultValue:
                        "Scratches or cuts from sharp tools or improper cleaning",
                    })}
                  </li>
                  <li>
                    •{" "}
                    {t("warrantyExcludes3", {
                      defaultValue:
                        "Exposure to excessive heat beyond normal usage",
                    })}
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-lg mb-2">
                  {t("replacementConditions", {
                    defaultValue: "Replacement or Compensation Terms:",
                  })}
                </h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>
                    •{" "}
                    {t("replacementConditions1", {
                      defaultValue:
                        "Original purchase invoice must be provided",
                    })}
                  </li>
                  <li>
                    •{" "}
                    {t("replacementConditions2", {
                      defaultValue:
                        "Submit a portion of the damaged roll for inspection",
                    })}
                  </li>
                  <li>
                    •{" "}
                    {t("replacementConditions3", {
                      defaultValue:
                        "Company reserves the right to replace the product, warranty does not include installation or removal costs",
                    })}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">
              {t("contactInfo", { defaultValue: "Need Help?" })}
            </h4>
            <p className="text-blue-700 text-sm">
              {t("contactInfoText", {
                defaultValue:
                  "For questions about returns, contact our customer service team via WhatsApp or email.",
              })}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnPolicyDialog;
