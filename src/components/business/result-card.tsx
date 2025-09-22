import { LockIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

type Props = ComponentProps<"div"> & {
  hints: Array<string | undefined>;
  answer: string;
};

export function ResultCard(props: Props) {
  const { hints, answer, ...htmlProps } = props;
  return (
    <Card {...htmlProps}>
      <CardHeader>
        <CardTitle>Résultat</CardTitle>
      </CardHeader>
      <CardContent>
        <Input />
        <div className="flex">
          {hints.map((hint, index) => (
            <div key={index} className="mt-2">
              {hint ? hint : <LockIcon />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
