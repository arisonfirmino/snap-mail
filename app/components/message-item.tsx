import { Card, CardContent, CardHeader } from "@/app/components/ui/card";

import { ChevronRightIcon } from "lucide-react";

const MessageItem = () => {
  return (
    <Card className="space-y-1 border-b bg-transparent pb-2.5 duration-300 hover:bg-background">
      <CardHeader className="items-start justify-between border-b pb-1.5">
        <div>
          <h2 className="text-base font-medium">Lucas Oliveira</h2>
          <p className="text-xs text-muted">lucas.oliveira@snapmail.com</p>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted">
          18/12/2024
          <ChevronRightIcon size={14} />
        </div>
      </CardHeader>

      <CardContent>
        <h3 className="truncate text-sm font-medium">
          Atualização no projeto da equipe
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
          iusto ipsum nostrum illo voluptas accusamus soluta quidem at provident
          expedita aperiam deserunt nihil explicabo maiores aut ullam pariatur
          doloremque! Hic.
        </p>
      </CardContent>
    </Card>
  );
};

export default MessageItem;
