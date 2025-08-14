import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            alt="Peter Mwangi"
            className="object-cover"
          />
          <AvatarFallback>PM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sunrise Apartments</p>
          <p className="text-sm text-muted-foreground">Peter Mwangi - Caretaker</p>
        </div>
        <div className="ml-auto font-medium">50 units</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="Mary Njeri"
            className="object-cover"
          />
          <AvatarFallback>MN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Garden View Complex</p>
          <p className="text-sm text-muted-foreground">Mary Njeri - Caretaker</p>
        </div>
        <div className="ml-auto font-medium">75 units</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
            alt="James Kiprotich"
            className="object-cover"
          />
          <AvatarFallback>JK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Riverside Towers</p>
          <p className="text-sm text-muted-foreground">James Kiprotich - Caretaker</p>
        </div>
        <div className="ml-auto font-medium">120 units</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="Grace Wanjiku"
            className="object-cover"
          />
          <AvatarFallback>GW</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">City Center Plaza</p>
          <p className="text-sm text-muted-foreground">Grace Wanjiku - Caretaker</p>
        </div>
        <div className="ml-auto font-medium">30 units</div>
      </div>
    </div>
  )
}
