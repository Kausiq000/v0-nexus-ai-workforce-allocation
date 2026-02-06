"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  BrainCircuit,
  Bell,
  Shield,
  RefreshCw,
} from "lucide-react"

export function SettingsView() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Configure system preferences and AI behavior
        </p>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <BrainCircuit className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              AI Engine Configuration
            </h3>
            <p className="text-xs text-muted-foreground">
              Manage how AI makes allocation decisions
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">Auto-Allocation</Label>
              <p className="text-xs text-muted-foreground">
                Allow AI to automatically assign workers to tasks
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">Fatigue Detection</Label>
              <p className="text-xs text-muted-foreground">
                Monitor worker fatigue levels via wearable data
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">
                Predictive Maintenance Alerts
              </Label>
              <p className="text-xs text-muted-foreground">
                Send alerts for predicted machine failures
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-border" />
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-foreground">
              Confidence Threshold (%)
            </Label>
            <p className="text-xs text-muted-foreground">
              Minimum AI confidence level before auto-executing decisions
            </p>
            <Input
              type="number"
              defaultValue={75}
              className="w-32 h-9 border-border bg-muted/50 text-foreground"
            />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 border border-destructive/20">
            <Bell className="h-4 w-4 text-destructive" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Notifications
            </h3>
            <p className="text-xs text-muted-foreground">
              Alert preferences and channels
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-foreground">Safety Alerts</Label>
            <Badge className="bg-accent/15 text-accent border-accent/25 hover:bg-accent/15">
              Always On
            </Badge>
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <Label className="text-sm text-foreground">Bottleneck Warnings</Label>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <Label className="text-sm text-foreground">Shift Change Reminders</Label>
            <Switch />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
            <Shield className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              System
            </h3>
            <p className="text-xs text-muted-foreground">
              Platform version and data management
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Platform Version</span>
            <Badge className="bg-muted text-muted-foreground border-border hover:bg-muted">
              v3.2.1
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">AI Model Version</span>
            <Badge className="bg-primary/15 text-primary border-primary/25 hover:bg-primary/15">
              NexusAI v2.8
            </Badge>
          </div>
          <Separator className="bg-border" />
          <Button variant="outline" className="w-fit border-border bg-transparent text-foreground hover:bg-muted">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Data Now
          </Button>
        </div>
      </div>
    </div>
  )
}
