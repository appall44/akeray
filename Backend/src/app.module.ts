@@ -18,6 +18,7 @@
 import { TenantModule } from './tenant/tenant.module';
 import { NotificationsModule } from './notifications/notifications.module';
 import { SalesModule } from './sales/sales.module';
+import { ExportModule } from './export/export.module';
 
 @Module({
   imports: [
@@ -58,6 +59,7 @@
     TenantModule,
     NotificationsModule,
     SalesModule,
+    ExportModule,
   ],
 })
 export class AppModule {}