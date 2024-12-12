import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SidebarButtons() {
  return (
    <Card className="shadow-xl rounded-lg border-none w-[90%] mx-auto">
      <form>
        <CardContent className="grid gap-3 p-4">
          <Button
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none transition-colors duration-200 hover:bg-sidebar-primary-foreground hover:text-sidebar-primary rounded-lg px-4 py-2 text-base"
            size="sm"
          >
            Log in
          </Button>
          <Button
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none transition-colors duration-200 hover:bg-sidebar-primary-foreground hover:text-sidebar-primary rounded-lg px-4 py-2 text-base"
            size="sm"
          >
            Sign up
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
