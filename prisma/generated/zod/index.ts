import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AdminScalarFieldEnumSchema = z.enum(['id','name','route','email','password']);

export const AdminConfigScalarFieldEnumSchema = z.enum(['id','adminId','requirePayment','paymentValue','description','openingHours','closingHours','interval','multipleServices']);

export const ClosedDaysScalarFieldEnumSchema = z.enum(['id','adminId','dateClosed']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const ServiceScalarFieldEnumSchema = z.enum(['id','adminId','imageUrl','imageKey','name']);

export const ReservationScalarFieldEnumSchema = z.enum(['id','adminId','serviceId','paymentIdMP','paymentStatus','name','email','justDate','dateTime','createdAt']);

export const DayScalarFieldEnumSchema = z.enum(['weekDay','adminId','open','openingHour','closingHour','interval']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ADMIN SCHEMA
/////////////////////////////////////////

export const AdminSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string(),
})

export type Admin = z.infer<typeof AdminSchema>

/////////////////////////////////////////
// ADMIN CONFIG SCHEMA
/////////////////////////////////////////

export const AdminConfigSchema = z.object({
  id: z.string().cuid(),
  adminId: z.string(),
  requirePayment: z.boolean(),
  paymentValue: z.number(),
  description: z.string(),
  openingHours: z.coerce.date(),
  closingHours: z.coerce.date(),
  interval: z.coerce.date(),
  multipleServices: z.boolean(),
})

export type AdminConfig = z.infer<typeof AdminConfigSchema>

/////////////////////////////////////////
// CLOSED DAYS SCHEMA
/////////////////////////////////////////

export const ClosedDaysSchema = z.object({
  id: z.string().cuid(),
  adminId: z.string(),
  dateClosed: z.coerce.date(),
})

export type ClosedDays = z.infer<typeof ClosedDaysSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// SERVICE SCHEMA
/////////////////////////////////////////

export const ServiceSchema = z.object({
  id: z.string().cuid(),
  adminId: z.string(),
  imageUrl: z.string().nullable(),
  imageKey: z.string().nullable(),
  name: z.string(),
})

export type Service = z.infer<typeof ServiceSchema>

/////////////////////////////////////////
// RESERVATION SCHEMA
/////////////////////////////////////////

export const ReservationSchema = z.object({
  id: z.string().cuid(),
  adminId: z.string(),
  serviceId: z.string().nullable(),
  paymentIdMP: z.string().nullable(),
  paymentStatus: z.string().nullable(),
  name: z.string(),
  email: z.string(),
  justDate: z.coerce.date(),
  dateTime: z.coerce.date(),
  createdAt: z.coerce.date(),
})

export type Reservation = z.infer<typeof ReservationSchema>

/////////////////////////////////////////
// DAY SCHEMA
/////////////////////////////////////////

export const DaySchema = z.object({
  weekDay: z.number().int(),
  adminId: z.string(),
  open: z.boolean(),
  openingHour: z.coerce.date(),
  closingHour: z.coerce.date(),
  interval: z.coerce.date(),
})

export type Day = z.infer<typeof DaySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ADMIN
//------------------------------------------------------

export const AdminIncludeSchema: z.ZodType<Prisma.AdminInclude> = z.object({
  Reservation: z.union([z.boolean(),z.lazy(() => ReservationFindManyArgsSchema)]).optional(),
  AdminConfig: z.union([z.boolean(),z.lazy(() => AdminConfigArgsSchema)]).optional(),
  Service: z.union([z.boolean(),z.lazy(() => ServiceFindManyArgsSchema)]).optional(),
  ClosedDays: z.union([z.boolean(),z.lazy(() => ClosedDaysFindManyArgsSchema)]).optional(),
  Day: z.union([z.boolean(),z.lazy(() => DayFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AdminCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AdminArgsSchema: z.ZodType<Prisma.AdminArgs> = z.object({
  select: z.lazy(() => AdminSelectSchema).optional(),
  include: z.lazy(() => AdminIncludeSchema).optional(),
}).strict();

export const AdminCountOutputTypeArgsSchema: z.ZodType<Prisma.AdminCountOutputTypeArgs> = z.object({
  select: z.lazy(() => AdminCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AdminCountOutputTypeSelectSchema: z.ZodType<Prisma.AdminCountOutputTypeSelect> = z.object({
  Reservation: z.boolean().optional(),
  Service: z.boolean().optional(),
  ClosedDays: z.boolean().optional(),
  Day: z.boolean().optional(),
}).strict();

export const AdminSelectSchema: z.ZodType<Prisma.AdminSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  route: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  Reservation: z.union([z.boolean(),z.lazy(() => ReservationFindManyArgsSchema)]).optional(),
  AdminConfig: z.union([z.boolean(),z.lazy(() => AdminConfigArgsSchema)]).optional(),
  Service: z.union([z.boolean(),z.lazy(() => ServiceFindManyArgsSchema)]).optional(),
  ClosedDays: z.union([z.boolean(),z.lazy(() => ClosedDaysFindManyArgsSchema)]).optional(),
  Day: z.union([z.boolean(),z.lazy(() => DayFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AdminCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ADMIN CONFIG
//------------------------------------------------------

export const AdminConfigIncludeSchema: z.ZodType<Prisma.AdminConfigInclude> = z.object({
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
}).strict()

export const AdminConfigArgsSchema: z.ZodType<Prisma.AdminConfigArgs> = z.object({
  select: z.lazy(() => AdminConfigSelectSchema).optional(),
  include: z.lazy(() => AdminConfigIncludeSchema).optional(),
}).strict();

export const AdminConfigSelectSchema: z.ZodType<Prisma.AdminConfigSelect> = z.object({
  id: z.boolean().optional(),
  adminId: z.boolean().optional(),
  requirePayment: z.boolean().optional(),
  paymentValue: z.boolean().optional(),
  description: z.boolean().optional(),
  openingHours: z.boolean().optional(),
  closingHours: z.boolean().optional(),
  interval: z.boolean().optional(),
  multipleServices: z.boolean().optional(),
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
}).strict()

// CLOSED DAYS
//------------------------------------------------------

export const ClosedDaysIncludeSchema: z.ZodType<Prisma.ClosedDaysInclude> = z.object({
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
}).strict()

export const ClosedDaysArgsSchema: z.ZodType<Prisma.ClosedDaysArgs> = z.object({
  select: z.lazy(() => ClosedDaysSelectSchema).optional(),
  include: z.lazy(() => ClosedDaysIncludeSchema).optional(),
}).strict();

export const ClosedDaysSelectSchema: z.ZodType<Prisma.ClosedDaysSelect> = z.object({
  id: z.boolean().optional(),
  adminId: z.boolean().optional(),
  dateClosed: z.boolean().optional(),
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// SERVICE
//------------------------------------------------------

export const ServiceIncludeSchema: z.ZodType<Prisma.ServiceInclude> = z.object({
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
  reservations: z.union([z.boolean(),z.lazy(() => ReservationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ServiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ServiceArgsSchema: z.ZodType<Prisma.ServiceArgs> = z.object({
  select: z.lazy(() => ServiceSelectSchema).optional(),
  include: z.lazy(() => ServiceIncludeSchema).optional(),
}).strict();

export const ServiceCountOutputTypeArgsSchema: z.ZodType<Prisma.ServiceCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ServiceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ServiceCountOutputTypeSelectSchema: z.ZodType<Prisma.ServiceCountOutputTypeSelect> = z.object({
  reservations: z.boolean().optional(),
}).strict();

export const ServiceSelectSchema: z.ZodType<Prisma.ServiceSelect> = z.object({
  id: z.boolean().optional(),
  adminId: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  imageKey: z.boolean().optional(),
  name: z.boolean().optional(),
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
  reservations: z.union([z.boolean(),z.lazy(() => ReservationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ServiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RESERVATION
//------------------------------------------------------

export const ReservationIncludeSchema: z.ZodType<Prisma.ReservationInclude> = z.object({
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
}).strict()

export const ReservationArgsSchema: z.ZodType<Prisma.ReservationArgs> = z.object({
  select: z.lazy(() => ReservationSelectSchema).optional(),
  include: z.lazy(() => ReservationIncludeSchema).optional(),
}).strict();

export const ReservationSelectSchema: z.ZodType<Prisma.ReservationSelect> = z.object({
  id: z.boolean().optional(),
  adminId: z.boolean().optional(),
  serviceId: z.boolean().optional(),
  paymentIdMP: z.boolean().optional(),
  paymentStatus: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  justDate: z.boolean().optional(),
  dateTime: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
}).strict()

// DAY
//------------------------------------------------------

export const DayIncludeSchema: z.ZodType<Prisma.DayInclude> = z.object({
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
}).strict()

export const DayArgsSchema: z.ZodType<Prisma.DayArgs> = z.object({
  select: z.lazy(() => DaySelectSchema).optional(),
  include: z.lazy(() => DayIncludeSchema).optional(),
}).strict();

export const DaySelectSchema: z.ZodType<Prisma.DaySelect> = z.object({
  weekDay: z.boolean().optional(),
  adminId: z.boolean().optional(),
  open: z.boolean().optional(),
  openingHour: z.boolean().optional(),
  closingHour: z.boolean().optional(),
  interval: z.boolean().optional(),
  admin: z.union([z.boolean(),z.lazy(() => AdminArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AdminWhereInputSchema: z.ZodType<Prisma.AdminWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AdminWhereInputSchema),z.lazy(() => AdminWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminWhereInputSchema),z.lazy(() => AdminWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  route: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Reservation: z.lazy(() => ReservationListRelationFilterSchema).optional(),
  AdminConfig: z.union([ z.lazy(() => AdminConfigNullableRelationFilterSchema),z.lazy(() => AdminConfigWhereInputSchema) ]).optional().nullable(),
  Service: z.lazy(() => ServiceListRelationFilterSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysListRelationFilterSchema).optional(),
  Day: z.lazy(() => DayListRelationFilterSchema).optional()
}).strict();

export const AdminOrderByWithRelationInputSchema: z.ZodType<Prisma.AdminOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  route: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  Reservation: z.lazy(() => ReservationOrderByRelationAggregateInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigOrderByWithRelationInputSchema).optional(),
  Service: z.lazy(() => ServiceOrderByRelationAggregateInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysOrderByRelationAggregateInputSchema).optional(),
  Day: z.lazy(() => DayOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AdminWhereUniqueInputSchema: z.ZodType<Prisma.AdminWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    name: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
    email: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => AdminWhereInputSchema),z.lazy(() => AdminWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminWhereInputSchema),z.lazy(() => AdminWhereInputSchema).array() ]).optional(),
  route: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Reservation: z.lazy(() => ReservationListRelationFilterSchema).optional(),
  AdminConfig: z.union([ z.lazy(() => AdminConfigNullableRelationFilterSchema),z.lazy(() => AdminConfigWhereInputSchema) ]).optional().nullable(),
  Service: z.lazy(() => ServiceListRelationFilterSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysListRelationFilterSchema).optional(),
  Day: z.lazy(() => DayListRelationFilterSchema).optional()
}).strict());

export const AdminOrderByWithAggregationInputSchema: z.ZodType<Prisma.AdminOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  route: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AdminCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AdminMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AdminMinOrderByAggregateInputSchema).optional()
}).strict();

export const AdminScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AdminScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AdminScalarWhereWithAggregatesInputSchema),z.lazy(() => AdminScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminScalarWhereWithAggregatesInputSchema),z.lazy(() => AdminScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  route: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AdminConfigWhereInputSchema: z.ZodType<Prisma.AdminConfigWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AdminConfigWhereInputSchema),z.lazy(() => AdminConfigWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminConfigWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminConfigWhereInputSchema),z.lazy(() => AdminConfigWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  requirePayment: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  paymentValue: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  openingHours: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  closingHours: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  interval: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  multipleServices: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
}).strict();

export const AdminConfigOrderByWithRelationInputSchema: z.ZodType<Prisma.AdminConfigOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  requirePayment: z.lazy(() => SortOrderSchema).optional(),
  paymentValue: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  openingHours: z.lazy(() => SortOrderSchema).optional(),
  closingHours: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional(),
  multipleServices: z.lazy(() => SortOrderSchema).optional(),
  admin: z.lazy(() => AdminOrderByWithRelationInputSchema).optional()
}).strict();

export const AdminConfigWhereUniqueInputSchema: z.ZodType<Prisma.AdminConfigWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    adminId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    adminId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  adminId: z.string().optional(),
  AND: z.union([ z.lazy(() => AdminConfigWhereInputSchema),z.lazy(() => AdminConfigWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminConfigWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminConfigWhereInputSchema),z.lazy(() => AdminConfigWhereInputSchema).array() ]).optional(),
  requirePayment: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  paymentValue: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  openingHours: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  closingHours: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  interval: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  multipleServices: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
}).strict());

export const AdminConfigOrderByWithAggregationInputSchema: z.ZodType<Prisma.AdminConfigOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  requirePayment: z.lazy(() => SortOrderSchema).optional(),
  paymentValue: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  openingHours: z.lazy(() => SortOrderSchema).optional(),
  closingHours: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional(),
  multipleServices: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AdminConfigCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AdminConfigAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AdminConfigMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AdminConfigMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AdminConfigSumOrderByAggregateInputSchema).optional()
}).strict();

export const AdminConfigScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AdminConfigScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AdminConfigScalarWhereWithAggregatesInputSchema),z.lazy(() => AdminConfigScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AdminConfigScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AdminConfigScalarWhereWithAggregatesInputSchema),z.lazy(() => AdminConfigScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  requirePayment: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  paymentValue: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  openingHours: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  closingHours: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  interval: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  multipleServices: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const ClosedDaysWhereInputSchema: z.ZodType<Prisma.ClosedDaysWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ClosedDaysWhereInputSchema),z.lazy(() => ClosedDaysWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClosedDaysWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClosedDaysWhereInputSchema),z.lazy(() => ClosedDaysWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dateClosed: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
}).strict();

export const ClosedDaysOrderByWithRelationInputSchema: z.ZodType<Prisma.ClosedDaysOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  dateClosed: z.lazy(() => SortOrderSchema).optional(),
  admin: z.lazy(() => AdminOrderByWithRelationInputSchema).optional()
}).strict();

export const ClosedDaysWhereUniqueInputSchema: z.ZodType<Prisma.ClosedDaysWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ClosedDaysWhereInputSchema),z.lazy(() => ClosedDaysWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClosedDaysWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClosedDaysWhereInputSchema),z.lazy(() => ClosedDaysWhereInputSchema).array() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dateClosed: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
}).strict());

export const ClosedDaysOrderByWithAggregationInputSchema: z.ZodType<Prisma.ClosedDaysOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  dateClosed: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ClosedDaysCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ClosedDaysMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ClosedDaysMinOrderByAggregateInputSchema).optional()
}).strict();

export const ClosedDaysScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ClosedDaysScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ClosedDaysScalarWhereWithAggregatesInputSchema),z.lazy(() => ClosedDaysScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClosedDaysScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClosedDaysScalarWhereWithAggregatesInputSchema),z.lazy(() => ClosedDaysScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dateClosed: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ServiceWhereInputSchema: z.ZodType<Prisma.ServiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageKey: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  reservations: z.lazy(() => ReservationListRelationFilterSchema).optional()
}).strict();

export const ServiceOrderByWithRelationInputSchema: z.ZodType<Prisma.ServiceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageKey: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  admin: z.lazy(() => AdminOrderByWithRelationInputSchema).optional(),
  reservations: z.lazy(() => ReservationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ServiceWhereUniqueInputSchema: z.ZodType<Prisma.ServiceWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    adminId_name: z.lazy(() => ServiceAdminIdNameCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    adminId_name: z.lazy(() => ServiceAdminIdNameCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  adminId_name: z.lazy(() => ServiceAdminIdNameCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageKey: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  reservations: z.lazy(() => ReservationListRelationFilterSchema).optional()
}).strict());

export const ServiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ServiceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageKey: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ServiceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ServiceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ServiceMinOrderByAggregateInputSchema).optional()
}).strict();

export const ServiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ServiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  imageKey: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ReservationWhereInputSchema: z.ZodType<Prisma.ReservationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReservationWhereInputSchema),z.lazy(() => ReservationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReservationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReservationWhereInputSchema),z.lazy(() => ReservationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  paymentIdMP: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  paymentStatus: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  justDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dateTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  service: z.union([ z.lazy(() => ServiceNullableRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ReservationOrderByWithRelationInputSchema: z.ZodType<Prisma.ReservationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  paymentIdMP: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  paymentStatus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  justDate: z.lazy(() => SortOrderSchema).optional(),
  dateTime: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  admin: z.lazy(() => AdminOrderByWithRelationInputSchema).optional(),
  service: z.lazy(() => ServiceOrderByWithRelationInputSchema).optional()
}).strict();

export const ReservationWhereUniqueInputSchema: z.ZodType<Prisma.ReservationWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    paymentIdMP: z.string(),
    dateTime_serviceId: z.lazy(() => ReservationDateTimeServiceIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
    paymentIdMP: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    dateTime_serviceId: z.lazy(() => ReservationDateTimeServiceIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    paymentIdMP: z.string(),
    dateTime_serviceId: z.lazy(() => ReservationDateTimeServiceIdCompoundUniqueInputSchema),
  }),
  z.object({
    paymentIdMP: z.string(),
  }),
  z.object({
    dateTime_serviceId: z.lazy(() => ReservationDateTimeServiceIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  paymentIdMP: z.string().optional(),
  dateTime_serviceId: z.lazy(() => ReservationDateTimeServiceIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ReservationWhereInputSchema),z.lazy(() => ReservationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReservationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReservationWhereInputSchema),z.lazy(() => ReservationWhereInputSchema).array() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  paymentStatus: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  justDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dateTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
  service: z.union([ z.lazy(() => ServiceNullableRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ReservationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReservationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  paymentIdMP: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  paymentStatus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  justDate: z.lazy(() => SortOrderSchema).optional(),
  dateTime: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReservationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReservationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReservationMinOrderByAggregateInputSchema).optional()
}).strict();

export const ReservationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReservationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReservationScalarWhereWithAggregatesInputSchema),z.lazy(() => ReservationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReservationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReservationScalarWhereWithAggregatesInputSchema),z.lazy(() => ReservationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  paymentIdMP: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  paymentStatus: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  justDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  dateTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DayWhereInputSchema: z.ZodType<Prisma.DayWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DayWhereInputSchema),z.lazy(() => DayWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DayWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DayWhereInputSchema),z.lazy(() => DayWhereInputSchema).array() ]).optional(),
  weekDay: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  open: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  openingHour: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  closingHour: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  interval: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
}).strict();

export const DayOrderByWithRelationInputSchema: z.ZodType<Prisma.DayOrderByWithRelationInput> = z.object({
  weekDay: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  open: z.lazy(() => SortOrderSchema).optional(),
  openingHour: z.lazy(() => SortOrderSchema).optional(),
  closingHour: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional(),
  admin: z.lazy(() => AdminOrderByWithRelationInputSchema).optional()
}).strict();

export const DayWhereUniqueInputSchema: z.ZodType<Prisma.DayWhereUniqueInput> = z.object({
  weekDay_adminId: z.lazy(() => DayWeekDayAdminIdCompoundUniqueInputSchema)
})
.and(z.object({
  weekDay_adminId: z.lazy(() => DayWeekDayAdminIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => DayWhereInputSchema),z.lazy(() => DayWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DayWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DayWhereInputSchema),z.lazy(() => DayWhereInputSchema).array() ]).optional(),
  weekDay: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  open: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  openingHour: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  closingHour: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  interval: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  admin: z.union([ z.lazy(() => AdminRelationFilterSchema),z.lazy(() => AdminWhereInputSchema) ]).optional(),
}).strict());

export const DayOrderByWithAggregationInputSchema: z.ZodType<Prisma.DayOrderByWithAggregationInput> = z.object({
  weekDay: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  open: z.lazy(() => SortOrderSchema).optional(),
  openingHour: z.lazy(() => SortOrderSchema).optional(),
  closingHour: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DayCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DayAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DayMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DayMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DaySumOrderByAggregateInputSchema).optional()
}).strict();

export const DayScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DayScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DayScalarWhereWithAggregatesInputSchema),z.lazy(() => DayScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DayScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DayScalarWhereWithAggregatesInputSchema),z.lazy(() => DayScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  weekDay: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  adminId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  open: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  openingHour: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  closingHour: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  interval: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AdminCreateInputSchema: z.ZodType<Prisma.AdminCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string(),
  Reservation: z.lazy(() => ReservationCreateNestedManyWithoutAdminInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigCreateNestedOneWithoutAdminInputSchema).optional(),
  Service: z.lazy(() => ServiceCreateNestedManyWithoutAdminInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysCreateNestedManyWithoutAdminInputSchema).optional(),
  Day: z.lazy(() => DayCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminUncheckedCreateInputSchema: z.ZodType<Prisma.AdminUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string(),
  Reservation: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigUncheckedCreateNestedOneWithoutAdminInputSchema).optional(),
  Service: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  Day: z.lazy(() => DayUncheckedCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminUpdateInputSchema: z.ZodType<Prisma.AdminUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Reservation: z.lazy(() => ReservationUpdateManyWithoutAdminNestedInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigUpdateOneWithoutAdminNestedInputSchema).optional(),
  Service: z.lazy(() => ServiceUpdateManyWithoutAdminNestedInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUpdateManyWithoutAdminNestedInputSchema).optional(),
  Day: z.lazy(() => DayUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminUncheckedUpdateInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Reservation: z.lazy(() => ReservationUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigUncheckedUpdateOneWithoutAdminNestedInputSchema).optional(),
  Service: z.lazy(() => ServiceUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  Day: z.lazy(() => DayUncheckedUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminCreateManyInputSchema: z.ZodType<Prisma.AdminCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string()
}).strict();

export const AdminUpdateManyMutationInputSchema: z.ZodType<Prisma.AdminUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminConfigCreateInputSchema: z.ZodType<Prisma.AdminConfigCreateInput> = z.object({
  id: z.string().cuid().optional(),
  requirePayment: z.boolean().optional(),
  paymentValue: z.number().optional(),
  description: z.string().optional(),
  openingHours: z.coerce.date(),
  closingHours: z.coerce.date(),
  interval: z.coerce.date(),
  multipleServices: z.boolean().optional(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutAdminConfigInputSchema)
}).strict();

export const AdminConfigUncheckedCreateInputSchema: z.ZodType<Prisma.AdminConfigUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  adminId: z.string(),
  requirePayment: z.boolean().optional(),
  paymentValue: z.number().optional(),
  description: z.string().optional(),
  openingHours: z.coerce.date(),
  closingHours: z.coerce.date(),
  interval: z.coerce.date(),
  multipleServices: z.boolean().optional()
}).strict();

export const AdminConfigUpdateInputSchema: z.ZodType<Prisma.AdminConfigUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirePayment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  paymentValue: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  openingHours: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  closingHours: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  interval: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  multipleServices: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutAdminConfigNestedInputSchema).optional()
}).strict();

export const AdminConfigUncheckedUpdateInputSchema: z.ZodType<Prisma.AdminConfigUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirePayment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  paymentValue: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  openingHours: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  closingHours: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  interval: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  multipleServices: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminConfigCreateManyInputSchema: z.ZodType<Prisma.AdminConfigCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  adminId: z.string(),
  requirePayment: z.boolean().optional(),
  paymentValue: z.number().optional(),
  description: z.string().optional(),
  openingHours: z.coerce.date(),
  closingHours: z.coerce.date(),
  interval: z.coerce.date(),
  multipleServices: z.boolean().optional()
}).strict();

export const AdminConfigUpdateManyMutationInputSchema: z.ZodType<Prisma.AdminConfigUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirePayment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  paymentValue: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  openingHours: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  closingHours: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  interval: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  multipleServices: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminConfigUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AdminConfigUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirePayment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  paymentValue: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  openingHours: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  closingHours: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  interval: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  multipleServices: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClosedDaysCreateInputSchema: z.ZodType<Prisma.ClosedDaysCreateInput> = z.object({
  id: z.string().cuid().optional(),
  dateClosed: z.coerce.date(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutClosedDaysInputSchema)
}).strict();

export const ClosedDaysUncheckedCreateInputSchema: z.ZodType<Prisma.ClosedDaysUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  adminId: z.string(),
  dateClosed: z.coerce.date()
}).strict();

export const ClosedDaysUpdateInputSchema: z.ZodType<Prisma.ClosedDaysUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dateClosed: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutClosedDaysNestedInputSchema).optional()
}).strict();

export const ClosedDaysUncheckedUpdateInputSchema: z.ZodType<Prisma.ClosedDaysUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dateClosed: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClosedDaysCreateManyInputSchema: z.ZodType<Prisma.ClosedDaysCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  adminId: z.string(),
  dateClosed: z.coerce.date()
}).strict();

export const ClosedDaysUpdateManyMutationInputSchema: z.ZodType<Prisma.ClosedDaysUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dateClosed: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClosedDaysUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ClosedDaysUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dateClosed: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceCreateInputSchema: z.ZodType<Prisma.ServiceCreateInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string().optional().nullable(),
  imageKey: z.string().optional().nullable(),
  name: z.string(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutServiceInputSchema),
  reservations: z.lazy(() => ReservationCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  adminId: z.string(),
  imageUrl: z.string().optional().nullable(),
  imageKey: z.string().optional().nullable(),
  name: z.string(),
  reservations: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUpdateInputSchema: z.ZodType<Prisma.ServiceUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageKey: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutServiceNestedInputSchema).optional(),
  reservations: z.lazy(() => ReservationUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageKey: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reservations: z.lazy(() => ReservationUncheckedUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceCreateManyInputSchema: z.ZodType<Prisma.ServiceCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  adminId: z.string(),
  imageUrl: z.string().optional().nullable(),
  imageKey: z.string().optional().nullable(),
  name: z.string()
}).strict();

export const ServiceUpdateManyMutationInputSchema: z.ZodType<Prisma.ServiceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageKey: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageKey: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationCreateInputSchema: z.ZodType<Prisma.ReservationCreateInput> = z.object({
  id: z.string().cuid().optional(),
  paymentIdMP: z.string().optional().nullable(),
  paymentStatus: z.string().optional().nullable(),
  name: z.string(),
  email: z.string(),
  justDate: z.coerce.date(),
  dateTime: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutReservationInputSchema),
  service: z.lazy(() => ServiceCreateNestedOneWithoutReservationsInputSchema).optional()
}).strict();

export const ReservationUncheckedCreateInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  adminId: z.string(),
  serviceId: z.string().optional().nullable(),
  paymentIdMP: z.string().optional().nullable(),
  paymentStatus: z.string().optional().nullable(),
  name: z.string(),
  email: z.string(),
  justDate: z.coerce.date(),
  dateTime: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ReservationUpdateInputSchema: z.ZodType<Prisma.ReservationUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIdMP: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  justDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutReservationNestedInputSchema).optional(),
  service: z.lazy(() => ServiceUpdateOneWithoutReservationsNestedInputSchema).optional()
}).strict();

export const ReservationUncheckedUpdateInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentIdMP: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  justDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationCreateManyInputSchema: z.ZodType<Prisma.ReservationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  adminId: z.string(),
  serviceId: z.string().optional().nullable(),
  paymentIdMP: z.string().optional().nullable(),
  paymentStatus: z.string().optional().nullable(),
  name: z.string(),
  email: z.string(),
  justDate: z.coerce.date(),
  dateTime: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ReservationUpdateManyMutationInputSchema: z.ZodType<Prisma.ReservationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIdMP: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  justDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentIdMP: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  justDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DayCreateInputSchema: z.ZodType<Prisma.DayCreateInput> = z.object({
  weekDay: z.number().int(),
  open: z.boolean().optional(),
  openingHour: z.coerce.date(),
  closingHour: z.coerce.date(),
  interval: z.coerce.date(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutDayInputSchema)
}).strict();

export const DayUncheckedCreateInputSchema: z.ZodType<Prisma.DayUncheckedCreateInput> = z.object({
  weekDay: z.number().int(),
  adminId: z.string(),
  open: z.boolean().optional(),
  openingHour: z.coerce.date(),
  closingHour: z.coerce.date(),
  interval: z.coerce.date()
}).strict();

export const DayUpdateInputSchema: z.ZodType<Prisma.DayUpdateInput> = z.object({
  weekDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  open: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  closingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  interval: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutDayNestedInputSchema).optional()
}).strict();

export const DayUncheckedUpdateInputSchema: z.ZodType<Prisma.DayUncheckedUpdateInput> = z.object({
  weekDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  open: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  closingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  interval: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DayCreateManyInputSchema: z.ZodType<Prisma.DayCreateManyInput> = z.object({
  weekDay: z.number().int(),
  adminId: z.string(),
  open: z.boolean().optional(),
  openingHour: z.coerce.date(),
  closingHour: z.coerce.date(),
  interval: z.coerce.date()
}).strict();

export const DayUpdateManyMutationInputSchema: z.ZodType<Prisma.DayUpdateManyMutationInput> = z.object({
  weekDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  open: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  closingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  interval: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DayUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DayUncheckedUpdateManyInput> = z.object({
  weekDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  open: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  closingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  interval: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const ReservationListRelationFilterSchema: z.ZodType<Prisma.ReservationListRelationFilter> = z.object({
  every: z.lazy(() => ReservationWhereInputSchema).optional(),
  some: z.lazy(() => ReservationWhereInputSchema).optional(),
  none: z.lazy(() => ReservationWhereInputSchema).optional()
}).strict();

export const AdminConfigNullableRelationFilterSchema: z.ZodType<Prisma.AdminConfigNullableRelationFilter> = z.object({
  is: z.lazy(() => AdminConfigWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AdminConfigWhereInputSchema).optional().nullable()
}).strict();

export const ServiceListRelationFilterSchema: z.ZodType<Prisma.ServiceListRelationFilter> = z.object({
  every: z.lazy(() => ServiceWhereInputSchema).optional(),
  some: z.lazy(() => ServiceWhereInputSchema).optional(),
  none: z.lazy(() => ServiceWhereInputSchema).optional()
}).strict();

export const ClosedDaysListRelationFilterSchema: z.ZodType<Prisma.ClosedDaysListRelationFilter> = z.object({
  every: z.lazy(() => ClosedDaysWhereInputSchema).optional(),
  some: z.lazy(() => ClosedDaysWhereInputSchema).optional(),
  none: z.lazy(() => ClosedDaysWhereInputSchema).optional()
}).strict();

export const DayListRelationFilterSchema: z.ZodType<Prisma.DayListRelationFilter> = z.object({
  every: z.lazy(() => DayWhereInputSchema).optional(),
  some: z.lazy(() => DayWhereInputSchema).optional(),
  none: z.lazy(() => DayWhereInputSchema).optional()
}).strict();

export const ReservationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReservationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ServiceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClosedDaysOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ClosedDaysOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DayOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DayOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminCountOrderByAggregateInputSchema: z.ZodType<Prisma.AdminCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  route: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AdminMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  route: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminMinOrderByAggregateInputSchema: z.ZodType<Prisma.AdminMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  route: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const AdminRelationFilterSchema: z.ZodType<Prisma.AdminRelationFilter> = z.object({
  is: z.lazy(() => AdminWhereInputSchema).optional(),
  isNot: z.lazy(() => AdminWhereInputSchema).optional()
}).strict();

export const AdminConfigCountOrderByAggregateInputSchema: z.ZodType<Prisma.AdminConfigCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  requirePayment: z.lazy(() => SortOrderSchema).optional(),
  paymentValue: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  openingHours: z.lazy(() => SortOrderSchema).optional(),
  closingHours: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional(),
  multipleServices: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminConfigAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AdminConfigAvgOrderByAggregateInput> = z.object({
  paymentValue: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminConfigMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AdminConfigMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  requirePayment: z.lazy(() => SortOrderSchema).optional(),
  paymentValue: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  openingHours: z.lazy(() => SortOrderSchema).optional(),
  closingHours: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional(),
  multipleServices: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminConfigMinOrderByAggregateInputSchema: z.ZodType<Prisma.AdminConfigMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  requirePayment: z.lazy(() => SortOrderSchema).optional(),
  paymentValue: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  openingHours: z.lazy(() => SortOrderSchema).optional(),
  closingHours: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional(),
  multipleServices: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AdminConfigSumOrderByAggregateInputSchema: z.ZodType<Prisma.AdminConfigSumOrderByAggregateInput> = z.object({
  paymentValue: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const ClosedDaysCountOrderByAggregateInputSchema: z.ZodType<Prisma.ClosedDaysCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  dateClosed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClosedDaysMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ClosedDaysMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  dateClosed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClosedDaysMinOrderByAggregateInputSchema: z.ZodType<Prisma.ClosedDaysMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  dateClosed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ServiceAdminIdNameCompoundUniqueInputSchema: z.ZodType<Prisma.ServiceAdminIdNameCompoundUniqueInput> = z.object({
  adminId: z.string(),
  name: z.string()
}).strict();

export const ServiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  imageKey: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  imageKey: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  imageKey: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const ServiceNullableRelationFilterSchema: z.ZodType<Prisma.ServiceNullableRelationFilter> = z.object({
  is: z.lazy(() => ServiceWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ServiceWhereInputSchema).optional().nullable()
}).strict();

export const ReservationDateTimeServiceIdCompoundUniqueInputSchema: z.ZodType<Prisma.ReservationDateTimeServiceIdCompoundUniqueInput> = z.object({
  dateTime: z.coerce.date(),
  serviceId: z.string()
}).strict();

export const ReservationCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  paymentIdMP: z.lazy(() => SortOrderSchema).optional(),
  paymentStatus: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  justDate: z.lazy(() => SortOrderSchema).optional(),
  dateTime: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReservationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  paymentIdMP: z.lazy(() => SortOrderSchema).optional(),
  paymentStatus: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  justDate: z.lazy(() => SortOrderSchema).optional(),
  dateTime: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReservationMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  paymentIdMP: z.lazy(() => SortOrderSchema).optional(),
  paymentStatus: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  justDate: z.lazy(() => SortOrderSchema).optional(),
  dateTime: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DayWeekDayAdminIdCompoundUniqueInputSchema: z.ZodType<Prisma.DayWeekDayAdminIdCompoundUniqueInput> = z.object({
  weekDay: z.number(),
  adminId: z.string()
}).strict();

export const DayCountOrderByAggregateInputSchema: z.ZodType<Prisma.DayCountOrderByAggregateInput> = z.object({
  weekDay: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  open: z.lazy(() => SortOrderSchema).optional(),
  openingHour: z.lazy(() => SortOrderSchema).optional(),
  closingHour: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DayAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DayAvgOrderByAggregateInput> = z.object({
  weekDay: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DayMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DayMaxOrderByAggregateInput> = z.object({
  weekDay: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  open: z.lazy(() => SortOrderSchema).optional(),
  openingHour: z.lazy(() => SortOrderSchema).optional(),
  closingHour: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DayMinOrderByAggregateInputSchema: z.ZodType<Prisma.DayMinOrderByAggregateInput> = z.object({
  weekDay: z.lazy(() => SortOrderSchema).optional(),
  adminId: z.lazy(() => SortOrderSchema).optional(),
  open: z.lazy(() => SortOrderSchema).optional(),
  openingHour: z.lazy(() => SortOrderSchema).optional(),
  closingHour: z.lazy(() => SortOrderSchema).optional(),
  interval: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DaySumOrderByAggregateInputSchema: z.ZodType<Prisma.DaySumOrderByAggregateInput> = z.object({
  weekDay: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const ReservationCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.ReservationCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutAdminInputSchema),z.lazy(() => ReservationCreateWithoutAdminInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AdminConfigCreateNestedOneWithoutAdminInputSchema: z.ZodType<Prisma.AdminConfigCreateNestedOneWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => AdminConfigCreateWithoutAdminInputSchema),z.lazy(() => AdminConfigUncheckedCreateWithoutAdminInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminConfigCreateOrConnectWithoutAdminInputSchema).optional(),
  connect: z.lazy(() => AdminConfigWhereUniqueInputSchema).optional()
}).strict();

export const ServiceCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.ServiceCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutAdminInputSchema),z.lazy(() => ServiceCreateWithoutAdminInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ClosedDaysCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.ClosedDaysCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => ClosedDaysCreateWithoutAdminInputSchema),z.lazy(() => ClosedDaysCreateWithoutAdminInputSchema).array(),z.lazy(() => ClosedDaysUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ClosedDaysUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClosedDaysCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ClosedDaysCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ClosedDaysCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ClosedDaysWhereUniqueInputSchema),z.lazy(() => ClosedDaysWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DayCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.DayCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => DayCreateWithoutAdminInputSchema),z.lazy(() => DayCreateWithoutAdminInputSchema).array(),z.lazy(() => DayUncheckedCreateWithoutAdminInputSchema),z.lazy(() => DayUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DayCreateOrConnectWithoutAdminInputSchema),z.lazy(() => DayCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DayCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReservationUncheckedCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutAdminInputSchema),z.lazy(() => ReservationCreateWithoutAdminInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AdminConfigUncheckedCreateNestedOneWithoutAdminInputSchema: z.ZodType<Prisma.AdminConfigUncheckedCreateNestedOneWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => AdminConfigCreateWithoutAdminInputSchema),z.lazy(() => AdminConfigUncheckedCreateWithoutAdminInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminConfigCreateOrConnectWithoutAdminInputSchema).optional(),
  connect: z.lazy(() => AdminConfigWhereUniqueInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutAdminInputSchema),z.lazy(() => ServiceCreateWithoutAdminInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ClosedDaysUncheckedCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.ClosedDaysUncheckedCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => ClosedDaysCreateWithoutAdminInputSchema),z.lazy(() => ClosedDaysCreateWithoutAdminInputSchema).array(),z.lazy(() => ClosedDaysUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ClosedDaysUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClosedDaysCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ClosedDaysCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ClosedDaysCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ClosedDaysWhereUniqueInputSchema),z.lazy(() => ClosedDaysWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DayUncheckedCreateNestedManyWithoutAdminInputSchema: z.ZodType<Prisma.DayUncheckedCreateNestedManyWithoutAdminInput> = z.object({
  create: z.union([ z.lazy(() => DayCreateWithoutAdminInputSchema),z.lazy(() => DayCreateWithoutAdminInputSchema).array(),z.lazy(() => DayUncheckedCreateWithoutAdminInputSchema),z.lazy(() => DayUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DayCreateOrConnectWithoutAdminInputSchema),z.lazy(() => DayCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DayCreateManyAdminInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const ReservationUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutAdminInputSchema),z.lazy(() => ReservationCreateWithoutAdminInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ReservationUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ReservationUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => ReservationUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AdminConfigUpdateOneWithoutAdminNestedInputSchema: z.ZodType<Prisma.AdminConfigUpdateOneWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminConfigCreateWithoutAdminInputSchema),z.lazy(() => AdminConfigUncheckedCreateWithoutAdminInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminConfigCreateOrConnectWithoutAdminInputSchema).optional(),
  upsert: z.lazy(() => AdminConfigUpsertWithoutAdminInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AdminConfigWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AdminConfigWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AdminConfigWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminConfigUpdateToOneWithWhereWithoutAdminInputSchema),z.lazy(() => AdminConfigUpdateWithoutAdminInputSchema),z.lazy(() => AdminConfigUncheckedUpdateWithoutAdminInputSchema) ]).optional(),
}).strict();

export const ServiceUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.ServiceUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutAdminInputSchema),z.lazy(() => ServiceCreateWithoutAdminInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ServiceUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ServiceUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => ServiceUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ClosedDaysUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.ClosedDaysUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClosedDaysCreateWithoutAdminInputSchema),z.lazy(() => ClosedDaysCreateWithoutAdminInputSchema).array(),z.lazy(() => ClosedDaysUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ClosedDaysUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClosedDaysCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ClosedDaysCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ClosedDaysUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ClosedDaysUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ClosedDaysCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ClosedDaysWhereUniqueInputSchema),z.lazy(() => ClosedDaysWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ClosedDaysWhereUniqueInputSchema),z.lazy(() => ClosedDaysWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ClosedDaysWhereUniqueInputSchema),z.lazy(() => ClosedDaysWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClosedDaysWhereUniqueInputSchema),z.lazy(() => ClosedDaysWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ClosedDaysUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ClosedDaysUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ClosedDaysUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => ClosedDaysUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ClosedDaysScalarWhereInputSchema),z.lazy(() => ClosedDaysScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DayUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.DayUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => DayCreateWithoutAdminInputSchema),z.lazy(() => DayCreateWithoutAdminInputSchema).array(),z.lazy(() => DayUncheckedCreateWithoutAdminInputSchema),z.lazy(() => DayUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DayCreateOrConnectWithoutAdminInputSchema),z.lazy(() => DayCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DayUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => DayUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DayCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DayUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => DayUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DayUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => DayUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DayScalarWhereInputSchema),z.lazy(() => DayScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReservationUncheckedUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutAdminInputSchema),z.lazy(() => ReservationCreateWithoutAdminInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ReservationUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ReservationUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => ReservationUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AdminConfigUncheckedUpdateOneWithoutAdminNestedInputSchema: z.ZodType<Prisma.AdminConfigUncheckedUpdateOneWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminConfigCreateWithoutAdminInputSchema),z.lazy(() => AdminConfigUncheckedCreateWithoutAdminInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminConfigCreateOrConnectWithoutAdminInputSchema).optional(),
  upsert: z.lazy(() => AdminConfigUpsertWithoutAdminInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AdminConfigWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AdminConfigWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AdminConfigWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminConfigUpdateToOneWithWhereWithoutAdminInputSchema),z.lazy(() => AdminConfigUpdateWithoutAdminInputSchema),z.lazy(() => AdminConfigUncheckedUpdateWithoutAdminInputSchema) ]).optional(),
}).strict();

export const ServiceUncheckedUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutAdminInputSchema),z.lazy(() => ServiceCreateWithoutAdminInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ServiceUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ServiceUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => ServiceUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ClosedDaysUncheckedUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.ClosedDaysUncheckedUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClosedDaysCreateWithoutAdminInputSchema),z.lazy(() => ClosedDaysCreateWithoutAdminInputSchema).array(),z.lazy(() => ClosedDaysUncheckedCreateWithoutAdminInputSchema),z.lazy(() => ClosedDaysUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClosedDaysCreateOrConnectWithoutAdminInputSchema),z.lazy(() => ClosedDaysCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ClosedDaysUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ClosedDaysUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ClosedDaysCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ClosedDaysWhereUniqueInputSchema),z.lazy(() => ClosedDaysWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ClosedDaysWhereUniqueInputSchema),z.lazy(() => ClosedDaysWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ClosedDaysWhereUniqueInputSchema),z.lazy(() => ClosedDaysWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClosedDaysWhereUniqueInputSchema),z.lazy(() => ClosedDaysWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ClosedDaysUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => ClosedDaysUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ClosedDaysUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => ClosedDaysUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ClosedDaysScalarWhereInputSchema),z.lazy(() => ClosedDaysScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DayUncheckedUpdateManyWithoutAdminNestedInputSchema: z.ZodType<Prisma.DayUncheckedUpdateManyWithoutAdminNestedInput> = z.object({
  create: z.union([ z.lazy(() => DayCreateWithoutAdminInputSchema),z.lazy(() => DayCreateWithoutAdminInputSchema).array(),z.lazy(() => DayUncheckedCreateWithoutAdminInputSchema),z.lazy(() => DayUncheckedCreateWithoutAdminInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DayCreateOrConnectWithoutAdminInputSchema),z.lazy(() => DayCreateOrConnectWithoutAdminInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DayUpsertWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => DayUpsertWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DayCreateManyAdminInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DayWhereUniqueInputSchema),z.lazy(() => DayWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DayUpdateWithWhereUniqueWithoutAdminInputSchema),z.lazy(() => DayUpdateWithWhereUniqueWithoutAdminInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DayUpdateManyWithWhereWithoutAdminInputSchema),z.lazy(() => DayUpdateManyWithWhereWithoutAdminInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DayScalarWhereInputSchema),z.lazy(() => DayScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AdminCreateNestedOneWithoutAdminConfigInputSchema: z.ZodType<Prisma.AdminCreateNestedOneWithoutAdminConfigInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutAdminConfigInputSchema),z.lazy(() => AdminUncheckedCreateWithoutAdminConfigInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutAdminConfigInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const AdminUpdateOneRequiredWithoutAdminConfigNestedInputSchema: z.ZodType<Prisma.AdminUpdateOneRequiredWithoutAdminConfigNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutAdminConfigInputSchema),z.lazy(() => AdminUncheckedCreateWithoutAdminConfigInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutAdminConfigInputSchema).optional(),
  upsert: z.lazy(() => AdminUpsertWithoutAdminConfigInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminUpdateToOneWithWhereWithoutAdminConfigInputSchema),z.lazy(() => AdminUpdateWithoutAdminConfigInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutAdminConfigInputSchema) ]).optional(),
}).strict();

export const AdminCreateNestedOneWithoutClosedDaysInputSchema: z.ZodType<Prisma.AdminCreateNestedOneWithoutClosedDaysInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutClosedDaysInputSchema),z.lazy(() => AdminUncheckedCreateWithoutClosedDaysInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutClosedDaysInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional()
}).strict();

export const AdminUpdateOneRequiredWithoutClosedDaysNestedInputSchema: z.ZodType<Prisma.AdminUpdateOneRequiredWithoutClosedDaysNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutClosedDaysInputSchema),z.lazy(() => AdminUncheckedCreateWithoutClosedDaysInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutClosedDaysInputSchema).optional(),
  upsert: z.lazy(() => AdminUpsertWithoutClosedDaysInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminUpdateToOneWithWhereWithoutClosedDaysInputSchema),z.lazy(() => AdminUpdateWithoutClosedDaysInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutClosedDaysInputSchema) ]).optional(),
}).strict();

export const AdminCreateNestedOneWithoutServiceInputSchema: z.ZodType<Prisma.AdminCreateNestedOneWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutServiceInputSchema),z.lazy(() => AdminUncheckedCreateWithoutServiceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutServiceInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional()
}).strict();

export const ReservationCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.ReservationCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutServiceInputSchema),z.lazy(() => ReservationCreateWithoutServiceInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutServiceInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutServiceInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReservationUncheckedCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutServiceInputSchema),z.lazy(() => ReservationCreateWithoutServiceInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutServiceInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutServiceInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const AdminUpdateOneRequiredWithoutServiceNestedInputSchema: z.ZodType<Prisma.AdminUpdateOneRequiredWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutServiceInputSchema),z.lazy(() => AdminUncheckedCreateWithoutServiceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutServiceInputSchema).optional(),
  upsert: z.lazy(() => AdminUpsertWithoutServiceInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminUpdateToOneWithWhereWithoutServiceInputSchema),z.lazy(() => AdminUpdateWithoutServiceInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutServiceInputSchema) ]).optional(),
}).strict();

export const ReservationUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutServiceInputSchema),z.lazy(() => ReservationCreateWithoutServiceInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutServiceInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutServiceInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => ReservationUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => ReservationUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => ReservationUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReservationUncheckedUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationCreateWithoutServiceInputSchema),z.lazy(() => ReservationCreateWithoutServiceInputSchema).array(),z.lazy(() => ReservationUncheckedCreateWithoutServiceInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationCreateOrConnectWithoutServiceInputSchema),z.lazy(() => ReservationCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => ReservationUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationWhereUniqueInputSchema),z.lazy(() => ReservationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => ReservationUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => ReservationUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AdminCreateNestedOneWithoutReservationInputSchema: z.ZodType<Prisma.AdminCreateNestedOneWithoutReservationInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutReservationInputSchema),z.lazy(() => AdminUncheckedCreateWithoutReservationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutReservationInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional()
}).strict();

export const ServiceCreateNestedOneWithoutReservationsInputSchema: z.ZodType<Prisma.ServiceCreateNestedOneWithoutReservationsInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutReservationsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutReservationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutReservationsInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional()
}).strict();

export const AdminUpdateOneRequiredWithoutReservationNestedInputSchema: z.ZodType<Prisma.AdminUpdateOneRequiredWithoutReservationNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutReservationInputSchema),z.lazy(() => AdminUncheckedCreateWithoutReservationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutReservationInputSchema).optional(),
  upsert: z.lazy(() => AdminUpsertWithoutReservationInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminUpdateToOneWithWhereWithoutReservationInputSchema),z.lazy(() => AdminUpdateWithoutReservationInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutReservationInputSchema) ]).optional(),
}).strict();

export const ServiceUpdateOneWithoutReservationsNestedInputSchema: z.ZodType<Prisma.ServiceUpdateOneWithoutReservationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutReservationsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutReservationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutReservationsInputSchema).optional(),
  upsert: z.lazy(() => ServiceUpsertWithoutReservationsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateToOneWithWhereWithoutReservationsInputSchema),z.lazy(() => ServiceUpdateWithoutReservationsInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutReservationsInputSchema) ]).optional(),
}).strict();

export const AdminCreateNestedOneWithoutDayInputSchema: z.ZodType<Prisma.AdminCreateNestedOneWithoutDayInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutDayInputSchema),z.lazy(() => AdminUncheckedCreateWithoutDayInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutDayInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const AdminUpdateOneRequiredWithoutDayNestedInputSchema: z.ZodType<Prisma.AdminUpdateOneRequiredWithoutDayNestedInput> = z.object({
  create: z.union([ z.lazy(() => AdminCreateWithoutDayInputSchema),z.lazy(() => AdminUncheckedCreateWithoutDayInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AdminCreateOrConnectWithoutDayInputSchema).optional(),
  upsert: z.lazy(() => AdminUpsertWithoutDayInputSchema).optional(),
  connect: z.lazy(() => AdminWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AdminUpdateToOneWithWhereWithoutDayInputSchema),z.lazy(() => AdminUpdateWithoutDayInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutDayInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const ReservationCreateWithoutAdminInputSchema: z.ZodType<Prisma.ReservationCreateWithoutAdminInput> = z.object({
  id: z.string().cuid().optional(),
  paymentIdMP: z.string().optional().nullable(),
  paymentStatus: z.string().optional().nullable(),
  name: z.string(),
  email: z.string(),
  justDate: z.coerce.date(),
  dateTime: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutReservationsInputSchema).optional()
}).strict();

export const ReservationUncheckedCreateWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateWithoutAdminInput> = z.object({
  id: z.string().cuid().optional(),
  serviceId: z.string().optional().nullable(),
  paymentIdMP: z.string().optional().nullable(),
  paymentStatus: z.string().optional().nullable(),
  name: z.string(),
  email: z.string(),
  justDate: z.coerce.date(),
  dateTime: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ReservationCreateOrConnectWithoutAdminInputSchema: z.ZodType<Prisma.ReservationCreateOrConnectWithoutAdminInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReservationCreateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const ReservationCreateManyAdminInputEnvelopeSchema: z.ZodType<Prisma.ReservationCreateManyAdminInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReservationCreateManyAdminInputSchema),z.lazy(() => ReservationCreateManyAdminInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AdminConfigCreateWithoutAdminInputSchema: z.ZodType<Prisma.AdminConfigCreateWithoutAdminInput> = z.object({
  id: z.string().cuid().optional(),
  requirePayment: z.boolean().optional(),
  paymentValue: z.number().optional(),
  description: z.string().optional(),
  openingHours: z.coerce.date(),
  closingHours: z.coerce.date(),
  interval: z.coerce.date(),
  multipleServices: z.boolean().optional()
}).strict();

export const AdminConfigUncheckedCreateWithoutAdminInputSchema: z.ZodType<Prisma.AdminConfigUncheckedCreateWithoutAdminInput> = z.object({
  id: z.string().cuid().optional(),
  requirePayment: z.boolean().optional(),
  paymentValue: z.number().optional(),
  description: z.string().optional(),
  openingHours: z.coerce.date(),
  closingHours: z.coerce.date(),
  interval: z.coerce.date(),
  multipleServices: z.boolean().optional()
}).strict();

export const AdminConfigCreateOrConnectWithoutAdminInputSchema: z.ZodType<Prisma.AdminConfigCreateOrConnectWithoutAdminInput> = z.object({
  where: z.lazy(() => AdminConfigWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AdminConfigCreateWithoutAdminInputSchema),z.lazy(() => AdminConfigUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const ServiceCreateWithoutAdminInputSchema: z.ZodType<Prisma.ServiceCreateWithoutAdminInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string().optional().nullable(),
  imageKey: z.string().optional().nullable(),
  name: z.string(),
  reservations: z.lazy(() => ReservationCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateWithoutAdminInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateWithoutAdminInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string().optional().nullable(),
  imageKey: z.string().optional().nullable(),
  name: z.string(),
  reservations: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceCreateOrConnectWithoutAdminInputSchema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutAdminInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceCreateWithoutAdminInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const ServiceCreateManyAdminInputEnvelopeSchema: z.ZodType<Prisma.ServiceCreateManyAdminInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ServiceCreateManyAdminInputSchema),z.lazy(() => ServiceCreateManyAdminInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ClosedDaysCreateWithoutAdminInputSchema: z.ZodType<Prisma.ClosedDaysCreateWithoutAdminInput> = z.object({
  id: z.string().cuid().optional(),
  dateClosed: z.coerce.date()
}).strict();

export const ClosedDaysUncheckedCreateWithoutAdminInputSchema: z.ZodType<Prisma.ClosedDaysUncheckedCreateWithoutAdminInput> = z.object({
  id: z.string().cuid().optional(),
  dateClosed: z.coerce.date()
}).strict();

export const ClosedDaysCreateOrConnectWithoutAdminInputSchema: z.ZodType<Prisma.ClosedDaysCreateOrConnectWithoutAdminInput> = z.object({
  where: z.lazy(() => ClosedDaysWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ClosedDaysCreateWithoutAdminInputSchema),z.lazy(() => ClosedDaysUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const ClosedDaysCreateManyAdminInputEnvelopeSchema: z.ZodType<Prisma.ClosedDaysCreateManyAdminInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ClosedDaysCreateManyAdminInputSchema),z.lazy(() => ClosedDaysCreateManyAdminInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DayCreateWithoutAdminInputSchema: z.ZodType<Prisma.DayCreateWithoutAdminInput> = z.object({
  weekDay: z.number().int(),
  open: z.boolean().optional(),
  openingHour: z.coerce.date(),
  closingHour: z.coerce.date(),
  interval: z.coerce.date()
}).strict();

export const DayUncheckedCreateWithoutAdminInputSchema: z.ZodType<Prisma.DayUncheckedCreateWithoutAdminInput> = z.object({
  weekDay: z.number().int(),
  open: z.boolean().optional(),
  openingHour: z.coerce.date(),
  closingHour: z.coerce.date(),
  interval: z.coerce.date()
}).strict();

export const DayCreateOrConnectWithoutAdminInputSchema: z.ZodType<Prisma.DayCreateOrConnectWithoutAdminInput> = z.object({
  where: z.lazy(() => DayWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DayCreateWithoutAdminInputSchema),z.lazy(() => DayUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const DayCreateManyAdminInputEnvelopeSchema: z.ZodType<Prisma.DayCreateManyAdminInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DayCreateManyAdminInputSchema),z.lazy(() => DayCreateManyAdminInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReservationUpsertWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUpsertWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReservationUpdateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedUpdateWithoutAdminInputSchema) ]),
  create: z.union([ z.lazy(() => ReservationCreateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const ReservationUpdateWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUpdateWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReservationUpdateWithoutAdminInputSchema),z.lazy(() => ReservationUncheckedUpdateWithoutAdminInputSchema) ]),
}).strict();

export const ReservationUpdateManyWithWhereWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithWhereWithoutAdminInput> = z.object({
  where: z.lazy(() => ReservationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReservationUpdateManyMutationInputSchema),z.lazy(() => ReservationUncheckedUpdateManyWithoutAdminInputSchema) ]),
}).strict();

export const ReservationScalarWhereInputSchema: z.ZodType<Prisma.ReservationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReservationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReservationScalarWhereInputSchema),z.lazy(() => ReservationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  paymentIdMP: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  paymentStatus: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  justDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dateTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AdminConfigUpsertWithoutAdminInputSchema: z.ZodType<Prisma.AdminConfigUpsertWithoutAdminInput> = z.object({
  update: z.union([ z.lazy(() => AdminConfigUpdateWithoutAdminInputSchema),z.lazy(() => AdminConfigUncheckedUpdateWithoutAdminInputSchema) ]),
  create: z.union([ z.lazy(() => AdminConfigCreateWithoutAdminInputSchema),z.lazy(() => AdminConfigUncheckedCreateWithoutAdminInputSchema) ]),
  where: z.lazy(() => AdminConfigWhereInputSchema).optional()
}).strict();

export const AdminConfigUpdateToOneWithWhereWithoutAdminInputSchema: z.ZodType<Prisma.AdminConfigUpdateToOneWithWhereWithoutAdminInput> = z.object({
  where: z.lazy(() => AdminConfigWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AdminConfigUpdateWithoutAdminInputSchema),z.lazy(() => AdminConfigUncheckedUpdateWithoutAdminInputSchema) ]),
}).strict();

export const AdminConfigUpdateWithoutAdminInputSchema: z.ZodType<Prisma.AdminConfigUpdateWithoutAdminInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirePayment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  paymentValue: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  openingHours: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  closingHours: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  interval: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  multipleServices: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminConfigUncheckedUpdateWithoutAdminInputSchema: z.ZodType<Prisma.AdminConfigUncheckedUpdateWithoutAdminInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirePayment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  paymentValue: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  openingHours: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  closingHours: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  interval: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  multipleServices: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceUpsertWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.ServiceUpsertWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ServiceUpdateWithoutAdminInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutAdminInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceCreateWithoutAdminInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const ServiceUpdateWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.ServiceUpdateWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ServiceUpdateWithoutAdminInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutAdminInputSchema) ]),
}).strict();

export const ServiceUpdateManyWithWhereWithoutAdminInputSchema: z.ZodType<Prisma.ServiceUpdateManyWithWhereWithoutAdminInput> = z.object({
  where: z.lazy(() => ServiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ServiceUpdateManyMutationInputSchema),z.lazy(() => ServiceUncheckedUpdateManyWithoutAdminInputSchema) ]),
}).strict();

export const ServiceScalarWhereInputSchema: z.ZodType<Prisma.ServiceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageKey: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ClosedDaysUpsertWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.ClosedDaysUpsertWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => ClosedDaysWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ClosedDaysUpdateWithoutAdminInputSchema),z.lazy(() => ClosedDaysUncheckedUpdateWithoutAdminInputSchema) ]),
  create: z.union([ z.lazy(() => ClosedDaysCreateWithoutAdminInputSchema),z.lazy(() => ClosedDaysUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const ClosedDaysUpdateWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.ClosedDaysUpdateWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => ClosedDaysWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ClosedDaysUpdateWithoutAdminInputSchema),z.lazy(() => ClosedDaysUncheckedUpdateWithoutAdminInputSchema) ]),
}).strict();

export const ClosedDaysUpdateManyWithWhereWithoutAdminInputSchema: z.ZodType<Prisma.ClosedDaysUpdateManyWithWhereWithoutAdminInput> = z.object({
  where: z.lazy(() => ClosedDaysScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ClosedDaysUpdateManyMutationInputSchema),z.lazy(() => ClosedDaysUncheckedUpdateManyWithoutAdminInputSchema) ]),
}).strict();

export const ClosedDaysScalarWhereInputSchema: z.ZodType<Prisma.ClosedDaysScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ClosedDaysScalarWhereInputSchema),z.lazy(() => ClosedDaysScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClosedDaysScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClosedDaysScalarWhereInputSchema),z.lazy(() => ClosedDaysScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dateClosed: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DayUpsertWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.DayUpsertWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => DayWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DayUpdateWithoutAdminInputSchema),z.lazy(() => DayUncheckedUpdateWithoutAdminInputSchema) ]),
  create: z.union([ z.lazy(() => DayCreateWithoutAdminInputSchema),z.lazy(() => DayUncheckedCreateWithoutAdminInputSchema) ]),
}).strict();

export const DayUpdateWithWhereUniqueWithoutAdminInputSchema: z.ZodType<Prisma.DayUpdateWithWhereUniqueWithoutAdminInput> = z.object({
  where: z.lazy(() => DayWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DayUpdateWithoutAdminInputSchema),z.lazy(() => DayUncheckedUpdateWithoutAdminInputSchema) ]),
}).strict();

export const DayUpdateManyWithWhereWithoutAdminInputSchema: z.ZodType<Prisma.DayUpdateManyWithWhereWithoutAdminInput> = z.object({
  where: z.lazy(() => DayScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DayUpdateManyMutationInputSchema),z.lazy(() => DayUncheckedUpdateManyWithoutAdminInputSchema) ]),
}).strict();

export const DayScalarWhereInputSchema: z.ZodType<Prisma.DayScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DayScalarWhereInputSchema),z.lazy(() => DayScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DayScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DayScalarWhereInputSchema),z.lazy(() => DayScalarWhereInputSchema).array() ]).optional(),
  weekDay: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  adminId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  open: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  openingHour: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  closingHour: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  interval: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AdminCreateWithoutAdminConfigInputSchema: z.ZodType<Prisma.AdminCreateWithoutAdminConfigInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string(),
  Reservation: z.lazy(() => ReservationCreateNestedManyWithoutAdminInputSchema).optional(),
  Service: z.lazy(() => ServiceCreateNestedManyWithoutAdminInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysCreateNestedManyWithoutAdminInputSchema).optional(),
  Day: z.lazy(() => DayCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminUncheckedCreateWithoutAdminConfigInputSchema: z.ZodType<Prisma.AdminUncheckedCreateWithoutAdminConfigInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string(),
  Reservation: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  Service: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  Day: z.lazy(() => DayUncheckedCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminCreateOrConnectWithoutAdminConfigInputSchema: z.ZodType<Prisma.AdminCreateOrConnectWithoutAdminConfigInput> = z.object({
  where: z.lazy(() => AdminWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AdminCreateWithoutAdminConfigInputSchema),z.lazy(() => AdminUncheckedCreateWithoutAdminConfigInputSchema) ]),
}).strict();

export const AdminUpsertWithoutAdminConfigInputSchema: z.ZodType<Prisma.AdminUpsertWithoutAdminConfigInput> = z.object({
  update: z.union([ z.lazy(() => AdminUpdateWithoutAdminConfigInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutAdminConfigInputSchema) ]),
  create: z.union([ z.lazy(() => AdminCreateWithoutAdminConfigInputSchema),z.lazy(() => AdminUncheckedCreateWithoutAdminConfigInputSchema) ]),
  where: z.lazy(() => AdminWhereInputSchema).optional()
}).strict();

export const AdminUpdateToOneWithWhereWithoutAdminConfigInputSchema: z.ZodType<Prisma.AdminUpdateToOneWithWhereWithoutAdminConfigInput> = z.object({
  where: z.lazy(() => AdminWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AdminUpdateWithoutAdminConfigInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutAdminConfigInputSchema) ]),
}).strict();

export const AdminUpdateWithoutAdminConfigInputSchema: z.ZodType<Prisma.AdminUpdateWithoutAdminConfigInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Reservation: z.lazy(() => ReservationUpdateManyWithoutAdminNestedInputSchema).optional(),
  Service: z.lazy(() => ServiceUpdateManyWithoutAdminNestedInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUpdateManyWithoutAdminNestedInputSchema).optional(),
  Day: z.lazy(() => DayUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminUncheckedUpdateWithoutAdminConfigInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateWithoutAdminConfigInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Reservation: z.lazy(() => ReservationUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  Service: z.lazy(() => ServiceUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  Day: z.lazy(() => DayUncheckedUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminCreateWithoutClosedDaysInputSchema: z.ZodType<Prisma.AdminCreateWithoutClosedDaysInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string(),
  Reservation: z.lazy(() => ReservationCreateNestedManyWithoutAdminInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigCreateNestedOneWithoutAdminInputSchema).optional(),
  Service: z.lazy(() => ServiceCreateNestedManyWithoutAdminInputSchema).optional(),
  Day: z.lazy(() => DayCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminUncheckedCreateWithoutClosedDaysInputSchema: z.ZodType<Prisma.AdminUncheckedCreateWithoutClosedDaysInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string(),
  Reservation: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigUncheckedCreateNestedOneWithoutAdminInputSchema).optional(),
  Service: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  Day: z.lazy(() => DayUncheckedCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminCreateOrConnectWithoutClosedDaysInputSchema: z.ZodType<Prisma.AdminCreateOrConnectWithoutClosedDaysInput> = z.object({
  where: z.lazy(() => AdminWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AdminCreateWithoutClosedDaysInputSchema),z.lazy(() => AdminUncheckedCreateWithoutClosedDaysInputSchema) ]),
}).strict();

export const AdminUpsertWithoutClosedDaysInputSchema: z.ZodType<Prisma.AdminUpsertWithoutClosedDaysInput> = z.object({
  update: z.union([ z.lazy(() => AdminUpdateWithoutClosedDaysInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutClosedDaysInputSchema) ]),
  create: z.union([ z.lazy(() => AdminCreateWithoutClosedDaysInputSchema),z.lazy(() => AdminUncheckedCreateWithoutClosedDaysInputSchema) ]),
  where: z.lazy(() => AdminWhereInputSchema).optional()
}).strict();

export const AdminUpdateToOneWithWhereWithoutClosedDaysInputSchema: z.ZodType<Prisma.AdminUpdateToOneWithWhereWithoutClosedDaysInput> = z.object({
  where: z.lazy(() => AdminWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AdminUpdateWithoutClosedDaysInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutClosedDaysInputSchema) ]),
}).strict();

export const AdminUpdateWithoutClosedDaysInputSchema: z.ZodType<Prisma.AdminUpdateWithoutClosedDaysInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Reservation: z.lazy(() => ReservationUpdateManyWithoutAdminNestedInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigUpdateOneWithoutAdminNestedInputSchema).optional(),
  Service: z.lazy(() => ServiceUpdateManyWithoutAdminNestedInputSchema).optional(),
  Day: z.lazy(() => DayUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminUncheckedUpdateWithoutClosedDaysInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateWithoutClosedDaysInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Reservation: z.lazy(() => ReservationUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigUncheckedUpdateOneWithoutAdminNestedInputSchema).optional(),
  Service: z.lazy(() => ServiceUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  Day: z.lazy(() => DayUncheckedUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminCreateWithoutServiceInputSchema: z.ZodType<Prisma.AdminCreateWithoutServiceInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string(),
  Reservation: z.lazy(() => ReservationCreateNestedManyWithoutAdminInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigCreateNestedOneWithoutAdminInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysCreateNestedManyWithoutAdminInputSchema).optional(),
  Day: z.lazy(() => DayCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminUncheckedCreateWithoutServiceInputSchema: z.ZodType<Prisma.AdminUncheckedCreateWithoutServiceInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string(),
  Reservation: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigUncheckedCreateNestedOneWithoutAdminInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  Day: z.lazy(() => DayUncheckedCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminCreateOrConnectWithoutServiceInputSchema: z.ZodType<Prisma.AdminCreateOrConnectWithoutServiceInput> = z.object({
  where: z.lazy(() => AdminWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AdminCreateWithoutServiceInputSchema),z.lazy(() => AdminUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const ReservationCreateWithoutServiceInputSchema: z.ZodType<Prisma.ReservationCreateWithoutServiceInput> = z.object({
  id: z.string().cuid().optional(),
  paymentIdMP: z.string().optional().nullable(),
  paymentStatus: z.string().optional().nullable(),
  name: z.string(),
  email: z.string(),
  justDate: z.coerce.date(),
  dateTime: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutReservationInputSchema)
}).strict();

export const ReservationUncheckedCreateWithoutServiceInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateWithoutServiceInput> = z.object({
  id: z.string().cuid().optional(),
  adminId: z.string(),
  paymentIdMP: z.string().optional().nullable(),
  paymentStatus: z.string().optional().nullable(),
  name: z.string(),
  email: z.string(),
  justDate: z.coerce.date(),
  dateTime: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ReservationCreateOrConnectWithoutServiceInputSchema: z.ZodType<Prisma.ReservationCreateOrConnectWithoutServiceInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReservationCreateWithoutServiceInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const ReservationCreateManyServiceInputEnvelopeSchema: z.ZodType<Prisma.ReservationCreateManyServiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReservationCreateManyServiceInputSchema),z.lazy(() => ReservationCreateManyServiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AdminUpsertWithoutServiceInputSchema: z.ZodType<Prisma.AdminUpsertWithoutServiceInput> = z.object({
  update: z.union([ z.lazy(() => AdminUpdateWithoutServiceInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutServiceInputSchema) ]),
  create: z.union([ z.lazy(() => AdminCreateWithoutServiceInputSchema),z.lazy(() => AdminUncheckedCreateWithoutServiceInputSchema) ]),
  where: z.lazy(() => AdminWhereInputSchema).optional()
}).strict();

export const AdminUpdateToOneWithWhereWithoutServiceInputSchema: z.ZodType<Prisma.AdminUpdateToOneWithWhereWithoutServiceInput> = z.object({
  where: z.lazy(() => AdminWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AdminUpdateWithoutServiceInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutServiceInputSchema) ]),
}).strict();

export const AdminUpdateWithoutServiceInputSchema: z.ZodType<Prisma.AdminUpdateWithoutServiceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Reservation: z.lazy(() => ReservationUpdateManyWithoutAdminNestedInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigUpdateOneWithoutAdminNestedInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUpdateManyWithoutAdminNestedInputSchema).optional(),
  Day: z.lazy(() => DayUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminUncheckedUpdateWithoutServiceInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateWithoutServiceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Reservation: z.lazy(() => ReservationUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigUncheckedUpdateOneWithoutAdminNestedInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  Day: z.lazy(() => DayUncheckedUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const ReservationUpsertWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.ReservationUpsertWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReservationUpdateWithoutServiceInputSchema),z.lazy(() => ReservationUncheckedUpdateWithoutServiceInputSchema) ]),
  create: z.union([ z.lazy(() => ReservationCreateWithoutServiceInputSchema),z.lazy(() => ReservationUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const ReservationUpdateWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.ReservationUpdateWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => ReservationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReservationUpdateWithoutServiceInputSchema),z.lazy(() => ReservationUncheckedUpdateWithoutServiceInputSchema) ]),
}).strict();

export const ReservationUpdateManyWithWhereWithoutServiceInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithWhereWithoutServiceInput> = z.object({
  where: z.lazy(() => ReservationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReservationUpdateManyMutationInputSchema),z.lazy(() => ReservationUncheckedUpdateManyWithoutServiceInputSchema) ]),
}).strict();

export const AdminCreateWithoutReservationInputSchema: z.ZodType<Prisma.AdminCreateWithoutReservationInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string(),
  AdminConfig: z.lazy(() => AdminConfigCreateNestedOneWithoutAdminInputSchema).optional(),
  Service: z.lazy(() => ServiceCreateNestedManyWithoutAdminInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysCreateNestedManyWithoutAdminInputSchema).optional(),
  Day: z.lazy(() => DayCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminUncheckedCreateWithoutReservationInputSchema: z.ZodType<Prisma.AdminUncheckedCreateWithoutReservationInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string(),
  AdminConfig: z.lazy(() => AdminConfigUncheckedCreateNestedOneWithoutAdminInputSchema).optional(),
  Service: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  Day: z.lazy(() => DayUncheckedCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminCreateOrConnectWithoutReservationInputSchema: z.ZodType<Prisma.AdminCreateOrConnectWithoutReservationInput> = z.object({
  where: z.lazy(() => AdminWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AdminCreateWithoutReservationInputSchema),z.lazy(() => AdminUncheckedCreateWithoutReservationInputSchema) ]),
}).strict();

export const ServiceCreateWithoutReservationsInputSchema: z.ZodType<Prisma.ServiceCreateWithoutReservationsInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string().optional().nullable(),
  imageKey: z.string().optional().nullable(),
  name: z.string(),
  admin: z.lazy(() => AdminCreateNestedOneWithoutServiceInputSchema)
}).strict();

export const ServiceUncheckedCreateWithoutReservationsInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateWithoutReservationsInput> = z.object({
  id: z.string().cuid().optional(),
  adminId: z.string(),
  imageUrl: z.string().optional().nullable(),
  imageKey: z.string().optional().nullable(),
  name: z.string()
}).strict();

export const ServiceCreateOrConnectWithoutReservationsInputSchema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutReservationsInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceCreateWithoutReservationsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutReservationsInputSchema) ]),
}).strict();

export const AdminUpsertWithoutReservationInputSchema: z.ZodType<Prisma.AdminUpsertWithoutReservationInput> = z.object({
  update: z.union([ z.lazy(() => AdminUpdateWithoutReservationInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutReservationInputSchema) ]),
  create: z.union([ z.lazy(() => AdminCreateWithoutReservationInputSchema),z.lazy(() => AdminUncheckedCreateWithoutReservationInputSchema) ]),
  where: z.lazy(() => AdminWhereInputSchema).optional()
}).strict();

export const AdminUpdateToOneWithWhereWithoutReservationInputSchema: z.ZodType<Prisma.AdminUpdateToOneWithWhereWithoutReservationInput> = z.object({
  where: z.lazy(() => AdminWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AdminUpdateWithoutReservationInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutReservationInputSchema) ]),
}).strict();

export const AdminUpdateWithoutReservationInputSchema: z.ZodType<Prisma.AdminUpdateWithoutReservationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  AdminConfig: z.lazy(() => AdminConfigUpdateOneWithoutAdminNestedInputSchema).optional(),
  Service: z.lazy(() => ServiceUpdateManyWithoutAdminNestedInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUpdateManyWithoutAdminNestedInputSchema).optional(),
  Day: z.lazy(() => DayUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminUncheckedUpdateWithoutReservationInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateWithoutReservationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  AdminConfig: z.lazy(() => AdminConfigUncheckedUpdateOneWithoutAdminNestedInputSchema).optional(),
  Service: z.lazy(() => ServiceUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  Day: z.lazy(() => DayUncheckedUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const ServiceUpsertWithoutReservationsInputSchema: z.ZodType<Prisma.ServiceUpsertWithoutReservationsInput> = z.object({
  update: z.union([ z.lazy(() => ServiceUpdateWithoutReservationsInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutReservationsInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceCreateWithoutReservationsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutReservationsInputSchema) ]),
  where: z.lazy(() => ServiceWhereInputSchema).optional()
}).strict();

export const ServiceUpdateToOneWithWhereWithoutReservationsInputSchema: z.ZodType<Prisma.ServiceUpdateToOneWithWhereWithoutReservationsInput> = z.object({
  where: z.lazy(() => ServiceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServiceUpdateWithoutReservationsInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutReservationsInputSchema) ]),
}).strict();

export const ServiceUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.ServiceUpdateWithoutReservationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageKey: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateWithoutReservationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageKey: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AdminCreateWithoutDayInputSchema: z.ZodType<Prisma.AdminCreateWithoutDayInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string(),
  Reservation: z.lazy(() => ReservationCreateNestedManyWithoutAdminInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigCreateNestedOneWithoutAdminInputSchema).optional(),
  Service: z.lazy(() => ServiceCreateNestedManyWithoutAdminInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminUncheckedCreateWithoutDayInputSchema: z.ZodType<Prisma.AdminUncheckedCreateWithoutDayInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  route: z.string(),
  email: z.string(),
  password: z.string(),
  Reservation: z.lazy(() => ReservationUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigUncheckedCreateNestedOneWithoutAdminInputSchema).optional(),
  Service: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutAdminInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUncheckedCreateNestedManyWithoutAdminInputSchema).optional()
}).strict();

export const AdminCreateOrConnectWithoutDayInputSchema: z.ZodType<Prisma.AdminCreateOrConnectWithoutDayInput> = z.object({
  where: z.lazy(() => AdminWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AdminCreateWithoutDayInputSchema),z.lazy(() => AdminUncheckedCreateWithoutDayInputSchema) ]),
}).strict();

export const AdminUpsertWithoutDayInputSchema: z.ZodType<Prisma.AdminUpsertWithoutDayInput> = z.object({
  update: z.union([ z.lazy(() => AdminUpdateWithoutDayInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutDayInputSchema) ]),
  create: z.union([ z.lazy(() => AdminCreateWithoutDayInputSchema),z.lazy(() => AdminUncheckedCreateWithoutDayInputSchema) ]),
  where: z.lazy(() => AdminWhereInputSchema).optional()
}).strict();

export const AdminUpdateToOneWithWhereWithoutDayInputSchema: z.ZodType<Prisma.AdminUpdateToOneWithWhereWithoutDayInput> = z.object({
  where: z.lazy(() => AdminWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AdminUpdateWithoutDayInputSchema),z.lazy(() => AdminUncheckedUpdateWithoutDayInputSchema) ]),
}).strict();

export const AdminUpdateWithoutDayInputSchema: z.ZodType<Prisma.AdminUpdateWithoutDayInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Reservation: z.lazy(() => ReservationUpdateManyWithoutAdminNestedInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigUpdateOneWithoutAdminNestedInputSchema).optional(),
  Service: z.lazy(() => ServiceUpdateManyWithoutAdminNestedInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const AdminUncheckedUpdateWithoutDayInputSchema: z.ZodType<Prisma.AdminUncheckedUpdateWithoutDayInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Reservation: z.lazy(() => ReservationUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  AdminConfig: z.lazy(() => AdminConfigUncheckedUpdateOneWithoutAdminNestedInputSchema).optional(),
  Service: z.lazy(() => ServiceUncheckedUpdateManyWithoutAdminNestedInputSchema).optional(),
  ClosedDays: z.lazy(() => ClosedDaysUncheckedUpdateManyWithoutAdminNestedInputSchema).optional()
}).strict();

export const ReservationCreateManyAdminInputSchema: z.ZodType<Prisma.ReservationCreateManyAdminInput> = z.object({
  id: z.string().cuid().optional(),
  serviceId: z.string().optional().nullable(),
  paymentIdMP: z.string().optional().nullable(),
  paymentStatus: z.string().optional().nullable(),
  name: z.string(),
  email: z.string(),
  justDate: z.coerce.date(),
  dateTime: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ServiceCreateManyAdminInputSchema: z.ZodType<Prisma.ServiceCreateManyAdminInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string().optional().nullable(),
  imageKey: z.string().optional().nullable(),
  name: z.string()
}).strict();

export const ClosedDaysCreateManyAdminInputSchema: z.ZodType<Prisma.ClosedDaysCreateManyAdminInput> = z.object({
  id: z.string().cuid().optional(),
  dateClosed: z.coerce.date()
}).strict();

export const DayCreateManyAdminInputSchema: z.ZodType<Prisma.DayCreateManyAdminInput> = z.object({
  weekDay: z.number().int(),
  open: z.boolean().optional(),
  openingHour: z.coerce.date(),
  closingHour: z.coerce.date(),
  interval: z.coerce.date()
}).strict();

export const ReservationUpdateWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUpdateWithoutAdminInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIdMP: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  justDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  service: z.lazy(() => ServiceUpdateOneWithoutReservationsNestedInputSchema).optional()
}).strict();

export const ReservationUncheckedUpdateWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateWithoutAdminInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentIdMP: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  justDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationUncheckedUpdateManyWithoutAdminInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyWithoutAdminInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentIdMP: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  justDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceUpdateWithoutAdminInputSchema: z.ZodType<Prisma.ServiceUpdateWithoutAdminInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageKey: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reservations: z.lazy(() => ReservationUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateWithoutAdminInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateWithoutAdminInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageKey: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reservations: z.lazy(() => ReservationUncheckedUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateManyWithoutAdminInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyWithoutAdminInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageKey: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClosedDaysUpdateWithoutAdminInputSchema: z.ZodType<Prisma.ClosedDaysUpdateWithoutAdminInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dateClosed: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClosedDaysUncheckedUpdateWithoutAdminInputSchema: z.ZodType<Prisma.ClosedDaysUncheckedUpdateWithoutAdminInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dateClosed: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClosedDaysUncheckedUpdateManyWithoutAdminInputSchema: z.ZodType<Prisma.ClosedDaysUncheckedUpdateManyWithoutAdminInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dateClosed: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DayUpdateWithoutAdminInputSchema: z.ZodType<Prisma.DayUpdateWithoutAdminInput> = z.object({
  weekDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  open: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  closingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  interval: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DayUncheckedUpdateWithoutAdminInputSchema: z.ZodType<Prisma.DayUncheckedUpdateWithoutAdminInput> = z.object({
  weekDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  open: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  closingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  interval: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DayUncheckedUpdateManyWithoutAdminInputSchema: z.ZodType<Prisma.DayUncheckedUpdateManyWithoutAdminInput> = z.object({
  weekDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  open: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  openingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  closingHour: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  interval: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationCreateManyServiceInputSchema: z.ZodType<Prisma.ReservationCreateManyServiceInput> = z.object({
  id: z.string().cuid().optional(),
  adminId: z.string(),
  paymentIdMP: z.string().optional().nullable(),
  paymentStatus: z.string().optional().nullable(),
  name: z.string(),
  email: z.string(),
  justDate: z.coerce.date(),
  dateTime: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ReservationUpdateWithoutServiceInputSchema: z.ZodType<Prisma.ReservationUpdateWithoutServiceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIdMP: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  justDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  admin: z.lazy(() => AdminUpdateOneRequiredWithoutReservationNestedInputSchema).optional()
}).strict();

export const ReservationUncheckedUpdateWithoutServiceInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateWithoutServiceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIdMP: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  justDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationUncheckedUpdateManyWithoutServiceInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyWithoutServiceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  adminId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentIdMP: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  paymentStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  justDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AdminFindFirstArgsSchema: z.ZodType<Prisma.AdminFindFirstArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithRelationInputSchema.array(),AdminOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminScalarFieldEnumSchema,AdminScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AdminFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AdminFindFirstOrThrowArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithRelationInputSchema.array(),AdminOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminScalarFieldEnumSchema,AdminScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AdminFindManyArgsSchema: z.ZodType<Prisma.AdminFindManyArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithRelationInputSchema.array(),AdminOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminScalarFieldEnumSchema,AdminScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AdminAggregateArgsSchema: z.ZodType<Prisma.AdminAggregateArgs> = z.object({
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithRelationInputSchema.array(),AdminOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AdminGroupByArgsSchema: z.ZodType<Prisma.AdminGroupByArgs> = z.object({
  where: AdminWhereInputSchema.optional(),
  orderBy: z.union([ AdminOrderByWithAggregationInputSchema.array(),AdminOrderByWithAggregationInputSchema ]).optional(),
  by: AdminScalarFieldEnumSchema.array(),
  having: AdminScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AdminFindUniqueArgsSchema: z.ZodType<Prisma.AdminFindUniqueArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereUniqueInputSchema,
}).strict()

export const AdminFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AdminFindUniqueOrThrowArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereUniqueInputSchema,
}).strict()

export const AdminConfigFindFirstArgsSchema: z.ZodType<Prisma.AdminConfigFindFirstArgs> = z.object({
  select: AdminConfigSelectSchema.optional(),
  include: AdminConfigIncludeSchema.optional(),
  where: AdminConfigWhereInputSchema.optional(),
  orderBy: z.union([ AdminConfigOrderByWithRelationInputSchema.array(),AdminConfigOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminConfigWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminConfigScalarFieldEnumSchema,AdminConfigScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AdminConfigFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AdminConfigFindFirstOrThrowArgs> = z.object({
  select: AdminConfigSelectSchema.optional(),
  include: AdminConfigIncludeSchema.optional(),
  where: AdminConfigWhereInputSchema.optional(),
  orderBy: z.union([ AdminConfigOrderByWithRelationInputSchema.array(),AdminConfigOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminConfigWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminConfigScalarFieldEnumSchema,AdminConfigScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AdminConfigFindManyArgsSchema: z.ZodType<Prisma.AdminConfigFindManyArgs> = z.object({
  select: AdminConfigSelectSchema.optional(),
  include: AdminConfigIncludeSchema.optional(),
  where: AdminConfigWhereInputSchema.optional(),
  orderBy: z.union([ AdminConfigOrderByWithRelationInputSchema.array(),AdminConfigOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminConfigWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AdminConfigScalarFieldEnumSchema,AdminConfigScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AdminConfigAggregateArgsSchema: z.ZodType<Prisma.AdminConfigAggregateArgs> = z.object({
  where: AdminConfigWhereInputSchema.optional(),
  orderBy: z.union([ AdminConfigOrderByWithRelationInputSchema.array(),AdminConfigOrderByWithRelationInputSchema ]).optional(),
  cursor: AdminConfigWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AdminConfigGroupByArgsSchema: z.ZodType<Prisma.AdminConfigGroupByArgs> = z.object({
  where: AdminConfigWhereInputSchema.optional(),
  orderBy: z.union([ AdminConfigOrderByWithAggregationInputSchema.array(),AdminConfigOrderByWithAggregationInputSchema ]).optional(),
  by: AdminConfigScalarFieldEnumSchema.array(),
  having: AdminConfigScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AdminConfigFindUniqueArgsSchema: z.ZodType<Prisma.AdminConfigFindUniqueArgs> = z.object({
  select: AdminConfigSelectSchema.optional(),
  include: AdminConfigIncludeSchema.optional(),
  where: AdminConfigWhereUniqueInputSchema,
}).strict()

export const AdminConfigFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AdminConfigFindUniqueOrThrowArgs> = z.object({
  select: AdminConfigSelectSchema.optional(),
  include: AdminConfigIncludeSchema.optional(),
  where: AdminConfigWhereUniqueInputSchema,
}).strict()

export const ClosedDaysFindFirstArgsSchema: z.ZodType<Prisma.ClosedDaysFindFirstArgs> = z.object({
  select: ClosedDaysSelectSchema.optional(),
  include: ClosedDaysIncludeSchema.optional(),
  where: ClosedDaysWhereInputSchema.optional(),
  orderBy: z.union([ ClosedDaysOrderByWithRelationInputSchema.array(),ClosedDaysOrderByWithRelationInputSchema ]).optional(),
  cursor: ClosedDaysWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClosedDaysScalarFieldEnumSchema,ClosedDaysScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ClosedDaysFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ClosedDaysFindFirstOrThrowArgs> = z.object({
  select: ClosedDaysSelectSchema.optional(),
  include: ClosedDaysIncludeSchema.optional(),
  where: ClosedDaysWhereInputSchema.optional(),
  orderBy: z.union([ ClosedDaysOrderByWithRelationInputSchema.array(),ClosedDaysOrderByWithRelationInputSchema ]).optional(),
  cursor: ClosedDaysWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClosedDaysScalarFieldEnumSchema,ClosedDaysScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ClosedDaysFindManyArgsSchema: z.ZodType<Prisma.ClosedDaysFindManyArgs> = z.object({
  select: ClosedDaysSelectSchema.optional(),
  include: ClosedDaysIncludeSchema.optional(),
  where: ClosedDaysWhereInputSchema.optional(),
  orderBy: z.union([ ClosedDaysOrderByWithRelationInputSchema.array(),ClosedDaysOrderByWithRelationInputSchema ]).optional(),
  cursor: ClosedDaysWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClosedDaysScalarFieldEnumSchema,ClosedDaysScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ClosedDaysAggregateArgsSchema: z.ZodType<Prisma.ClosedDaysAggregateArgs> = z.object({
  where: ClosedDaysWhereInputSchema.optional(),
  orderBy: z.union([ ClosedDaysOrderByWithRelationInputSchema.array(),ClosedDaysOrderByWithRelationInputSchema ]).optional(),
  cursor: ClosedDaysWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ClosedDaysGroupByArgsSchema: z.ZodType<Prisma.ClosedDaysGroupByArgs> = z.object({
  where: ClosedDaysWhereInputSchema.optional(),
  orderBy: z.union([ ClosedDaysOrderByWithAggregationInputSchema.array(),ClosedDaysOrderByWithAggregationInputSchema ]).optional(),
  by: ClosedDaysScalarFieldEnumSchema.array(),
  having: ClosedDaysScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ClosedDaysFindUniqueArgsSchema: z.ZodType<Prisma.ClosedDaysFindUniqueArgs> = z.object({
  select: ClosedDaysSelectSchema.optional(),
  include: ClosedDaysIncludeSchema.optional(),
  where: ClosedDaysWhereUniqueInputSchema,
}).strict()

export const ClosedDaysFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ClosedDaysFindUniqueOrThrowArgs> = z.object({
  select: ClosedDaysSelectSchema.optional(),
  include: ClosedDaysIncludeSchema.optional(),
  where: ClosedDaysWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const ServiceFindFirstArgsSchema: z.ZodType<Prisma.ServiceFindFirstArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ServiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindFirstOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ServiceFindManyArgsSchema: z.ZodType<Prisma.ServiceFindManyArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ServiceAggregateArgsSchema: z.ZodType<Prisma.ServiceAggregateArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ServiceGroupByArgsSchema: z.ZodType<Prisma.ServiceGroupByArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithAggregationInputSchema.array(),ServiceOrderByWithAggregationInputSchema ]).optional(),
  by: ServiceScalarFieldEnumSchema.array(),
  having: ServiceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ServiceFindUniqueArgsSchema: z.ZodType<Prisma.ServiceFindUniqueArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict()

export const ServiceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindUniqueOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict()

export const ReservationFindFirstArgsSchema: z.ZodType<Prisma.ReservationFindFirstArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereInputSchema.optional(),
  orderBy: z.union([ ReservationOrderByWithRelationInputSchema.array(),ReservationOrderByWithRelationInputSchema ]).optional(),
  cursor: ReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReservationScalarFieldEnumSchema,ReservationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ReservationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReservationFindFirstOrThrowArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereInputSchema.optional(),
  orderBy: z.union([ ReservationOrderByWithRelationInputSchema.array(),ReservationOrderByWithRelationInputSchema ]).optional(),
  cursor: ReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReservationScalarFieldEnumSchema,ReservationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ReservationFindManyArgsSchema: z.ZodType<Prisma.ReservationFindManyArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereInputSchema.optional(),
  orderBy: z.union([ ReservationOrderByWithRelationInputSchema.array(),ReservationOrderByWithRelationInputSchema ]).optional(),
  cursor: ReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReservationScalarFieldEnumSchema,ReservationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ReservationAggregateArgsSchema: z.ZodType<Prisma.ReservationAggregateArgs> = z.object({
  where: ReservationWhereInputSchema.optional(),
  orderBy: z.union([ ReservationOrderByWithRelationInputSchema.array(),ReservationOrderByWithRelationInputSchema ]).optional(),
  cursor: ReservationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ReservationGroupByArgsSchema: z.ZodType<Prisma.ReservationGroupByArgs> = z.object({
  where: ReservationWhereInputSchema.optional(),
  orderBy: z.union([ ReservationOrderByWithAggregationInputSchema.array(),ReservationOrderByWithAggregationInputSchema ]).optional(),
  by: ReservationScalarFieldEnumSchema.array(),
  having: ReservationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ReservationFindUniqueArgsSchema: z.ZodType<Prisma.ReservationFindUniqueArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereUniqueInputSchema,
}).strict()

export const ReservationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReservationFindUniqueOrThrowArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereUniqueInputSchema,
}).strict()

export const DayFindFirstArgsSchema: z.ZodType<Prisma.DayFindFirstArgs> = z.object({
  select: DaySelectSchema.optional(),
  include: DayIncludeSchema.optional(),
  where: DayWhereInputSchema.optional(),
  orderBy: z.union([ DayOrderByWithRelationInputSchema.array(),DayOrderByWithRelationInputSchema ]).optional(),
  cursor: DayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DayScalarFieldEnumSchema,DayScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DayFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DayFindFirstOrThrowArgs> = z.object({
  select: DaySelectSchema.optional(),
  include: DayIncludeSchema.optional(),
  where: DayWhereInputSchema.optional(),
  orderBy: z.union([ DayOrderByWithRelationInputSchema.array(),DayOrderByWithRelationInputSchema ]).optional(),
  cursor: DayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DayScalarFieldEnumSchema,DayScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DayFindManyArgsSchema: z.ZodType<Prisma.DayFindManyArgs> = z.object({
  select: DaySelectSchema.optional(),
  include: DayIncludeSchema.optional(),
  where: DayWhereInputSchema.optional(),
  orderBy: z.union([ DayOrderByWithRelationInputSchema.array(),DayOrderByWithRelationInputSchema ]).optional(),
  cursor: DayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DayScalarFieldEnumSchema,DayScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DayAggregateArgsSchema: z.ZodType<Prisma.DayAggregateArgs> = z.object({
  where: DayWhereInputSchema.optional(),
  orderBy: z.union([ DayOrderByWithRelationInputSchema.array(),DayOrderByWithRelationInputSchema ]).optional(),
  cursor: DayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DayGroupByArgsSchema: z.ZodType<Prisma.DayGroupByArgs> = z.object({
  where: DayWhereInputSchema.optional(),
  orderBy: z.union([ DayOrderByWithAggregationInputSchema.array(),DayOrderByWithAggregationInputSchema ]).optional(),
  by: DayScalarFieldEnumSchema.array(),
  having: DayScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DayFindUniqueArgsSchema: z.ZodType<Prisma.DayFindUniqueArgs> = z.object({
  select: DaySelectSchema.optional(),
  include: DayIncludeSchema.optional(),
  where: DayWhereUniqueInputSchema,
}).strict()

export const DayFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DayFindUniqueOrThrowArgs> = z.object({
  select: DaySelectSchema.optional(),
  include: DayIncludeSchema.optional(),
  where: DayWhereUniqueInputSchema,
}).strict()

export const AdminCreateArgsSchema: z.ZodType<Prisma.AdminCreateArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  data: z.union([ AdminCreateInputSchema,AdminUncheckedCreateInputSchema ]),
}).strict()

export const AdminUpsertArgsSchema: z.ZodType<Prisma.AdminUpsertArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereUniqueInputSchema,
  create: z.union([ AdminCreateInputSchema,AdminUncheckedCreateInputSchema ]),
  update: z.union([ AdminUpdateInputSchema,AdminUncheckedUpdateInputSchema ]),
}).strict()

export const AdminCreateManyArgsSchema: z.ZodType<Prisma.AdminCreateManyArgs> = z.object({
  data: z.union([ AdminCreateManyInputSchema,AdminCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AdminDeleteArgsSchema: z.ZodType<Prisma.AdminDeleteArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  where: AdminWhereUniqueInputSchema,
}).strict()

export const AdminUpdateArgsSchema: z.ZodType<Prisma.AdminUpdateArgs> = z.object({
  select: AdminSelectSchema.optional(),
  include: AdminIncludeSchema.optional(),
  data: z.union([ AdminUpdateInputSchema,AdminUncheckedUpdateInputSchema ]),
  where: AdminWhereUniqueInputSchema,
}).strict()

export const AdminUpdateManyArgsSchema: z.ZodType<Prisma.AdminUpdateManyArgs> = z.object({
  data: z.union([ AdminUpdateManyMutationInputSchema,AdminUncheckedUpdateManyInputSchema ]),
  where: AdminWhereInputSchema.optional(),
}).strict()

export const AdminDeleteManyArgsSchema: z.ZodType<Prisma.AdminDeleteManyArgs> = z.object({
  where: AdminWhereInputSchema.optional(),
}).strict()

export const AdminConfigCreateArgsSchema: z.ZodType<Prisma.AdminConfigCreateArgs> = z.object({
  select: AdminConfigSelectSchema.optional(),
  include: AdminConfigIncludeSchema.optional(),
  data: z.union([ AdminConfigCreateInputSchema,AdminConfigUncheckedCreateInputSchema ]),
}).strict()

export const AdminConfigUpsertArgsSchema: z.ZodType<Prisma.AdminConfigUpsertArgs> = z.object({
  select: AdminConfigSelectSchema.optional(),
  include: AdminConfigIncludeSchema.optional(),
  where: AdminConfigWhereUniqueInputSchema,
  create: z.union([ AdminConfigCreateInputSchema,AdminConfigUncheckedCreateInputSchema ]),
  update: z.union([ AdminConfigUpdateInputSchema,AdminConfigUncheckedUpdateInputSchema ]),
}).strict()

export const AdminConfigCreateManyArgsSchema: z.ZodType<Prisma.AdminConfigCreateManyArgs> = z.object({
  data: z.union([ AdminConfigCreateManyInputSchema,AdminConfigCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AdminConfigDeleteArgsSchema: z.ZodType<Prisma.AdminConfigDeleteArgs> = z.object({
  select: AdminConfigSelectSchema.optional(),
  include: AdminConfigIncludeSchema.optional(),
  where: AdminConfigWhereUniqueInputSchema,
}).strict()

export const AdminConfigUpdateArgsSchema: z.ZodType<Prisma.AdminConfigUpdateArgs> = z.object({
  select: AdminConfigSelectSchema.optional(),
  include: AdminConfigIncludeSchema.optional(),
  data: z.union([ AdminConfigUpdateInputSchema,AdminConfigUncheckedUpdateInputSchema ]),
  where: AdminConfigWhereUniqueInputSchema,
}).strict()

export const AdminConfigUpdateManyArgsSchema: z.ZodType<Prisma.AdminConfigUpdateManyArgs> = z.object({
  data: z.union([ AdminConfigUpdateManyMutationInputSchema,AdminConfigUncheckedUpdateManyInputSchema ]),
  where: AdminConfigWhereInputSchema.optional(),
}).strict()

export const AdminConfigDeleteManyArgsSchema: z.ZodType<Prisma.AdminConfigDeleteManyArgs> = z.object({
  where: AdminConfigWhereInputSchema.optional(),
}).strict()

export const ClosedDaysCreateArgsSchema: z.ZodType<Prisma.ClosedDaysCreateArgs> = z.object({
  select: ClosedDaysSelectSchema.optional(),
  include: ClosedDaysIncludeSchema.optional(),
  data: z.union([ ClosedDaysCreateInputSchema,ClosedDaysUncheckedCreateInputSchema ]),
}).strict()

export const ClosedDaysUpsertArgsSchema: z.ZodType<Prisma.ClosedDaysUpsertArgs> = z.object({
  select: ClosedDaysSelectSchema.optional(),
  include: ClosedDaysIncludeSchema.optional(),
  where: ClosedDaysWhereUniqueInputSchema,
  create: z.union([ ClosedDaysCreateInputSchema,ClosedDaysUncheckedCreateInputSchema ]),
  update: z.union([ ClosedDaysUpdateInputSchema,ClosedDaysUncheckedUpdateInputSchema ]),
}).strict()

export const ClosedDaysCreateManyArgsSchema: z.ZodType<Prisma.ClosedDaysCreateManyArgs> = z.object({
  data: z.union([ ClosedDaysCreateManyInputSchema,ClosedDaysCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ClosedDaysDeleteArgsSchema: z.ZodType<Prisma.ClosedDaysDeleteArgs> = z.object({
  select: ClosedDaysSelectSchema.optional(),
  include: ClosedDaysIncludeSchema.optional(),
  where: ClosedDaysWhereUniqueInputSchema,
}).strict()

export const ClosedDaysUpdateArgsSchema: z.ZodType<Prisma.ClosedDaysUpdateArgs> = z.object({
  select: ClosedDaysSelectSchema.optional(),
  include: ClosedDaysIncludeSchema.optional(),
  data: z.union([ ClosedDaysUpdateInputSchema,ClosedDaysUncheckedUpdateInputSchema ]),
  where: ClosedDaysWhereUniqueInputSchema,
}).strict()

export const ClosedDaysUpdateManyArgsSchema: z.ZodType<Prisma.ClosedDaysUpdateManyArgs> = z.object({
  data: z.union([ ClosedDaysUpdateManyMutationInputSchema,ClosedDaysUncheckedUpdateManyInputSchema ]),
  where: ClosedDaysWhereInputSchema.optional(),
}).strict()

export const ClosedDaysDeleteManyArgsSchema: z.ZodType<Prisma.ClosedDaysDeleteManyArgs> = z.object({
  where: ClosedDaysWhereInputSchema.optional(),
}).strict()

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict()

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict()

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const ServiceCreateArgsSchema: z.ZodType<Prisma.ServiceCreateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  data: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
}).strict()

export const ServiceUpsertArgsSchema: z.ZodType<Prisma.ServiceUpsertArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
  create: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
  update: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
}).strict()

export const ServiceCreateManyArgsSchema: z.ZodType<Prisma.ServiceCreateManyArgs> = z.object({
  data: z.union([ ServiceCreateManyInputSchema,ServiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ServiceDeleteArgsSchema: z.ZodType<Prisma.ServiceDeleteArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict()

export const ServiceUpdateArgsSchema: z.ZodType<Prisma.ServiceUpdateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  data: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
  where: ServiceWhereUniqueInputSchema,
}).strict()

export const ServiceUpdateManyArgsSchema: z.ZodType<Prisma.ServiceUpdateManyArgs> = z.object({
  data: z.union([ ServiceUpdateManyMutationInputSchema,ServiceUncheckedUpdateManyInputSchema ]),
  where: ServiceWhereInputSchema.optional(),
}).strict()

export const ServiceDeleteManyArgsSchema: z.ZodType<Prisma.ServiceDeleteManyArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
}).strict()

export const ReservationCreateArgsSchema: z.ZodType<Prisma.ReservationCreateArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  data: z.union([ ReservationCreateInputSchema,ReservationUncheckedCreateInputSchema ]),
}).strict()

export const ReservationUpsertArgsSchema: z.ZodType<Prisma.ReservationUpsertArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereUniqueInputSchema,
  create: z.union([ ReservationCreateInputSchema,ReservationUncheckedCreateInputSchema ]),
  update: z.union([ ReservationUpdateInputSchema,ReservationUncheckedUpdateInputSchema ]),
}).strict()

export const ReservationCreateManyArgsSchema: z.ZodType<Prisma.ReservationCreateManyArgs> = z.object({
  data: z.union([ ReservationCreateManyInputSchema,ReservationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ReservationDeleteArgsSchema: z.ZodType<Prisma.ReservationDeleteArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  where: ReservationWhereUniqueInputSchema,
}).strict()

export const ReservationUpdateArgsSchema: z.ZodType<Prisma.ReservationUpdateArgs> = z.object({
  select: ReservationSelectSchema.optional(),
  include: ReservationIncludeSchema.optional(),
  data: z.union([ ReservationUpdateInputSchema,ReservationUncheckedUpdateInputSchema ]),
  where: ReservationWhereUniqueInputSchema,
}).strict()

export const ReservationUpdateManyArgsSchema: z.ZodType<Prisma.ReservationUpdateManyArgs> = z.object({
  data: z.union([ ReservationUpdateManyMutationInputSchema,ReservationUncheckedUpdateManyInputSchema ]),
  where: ReservationWhereInputSchema.optional(),
}).strict()

export const ReservationDeleteManyArgsSchema: z.ZodType<Prisma.ReservationDeleteManyArgs> = z.object({
  where: ReservationWhereInputSchema.optional(),
}).strict()

export const DayCreateArgsSchema: z.ZodType<Prisma.DayCreateArgs> = z.object({
  select: DaySelectSchema.optional(),
  include: DayIncludeSchema.optional(),
  data: z.union([ DayCreateInputSchema,DayUncheckedCreateInputSchema ]),
}).strict()

export const DayUpsertArgsSchema: z.ZodType<Prisma.DayUpsertArgs> = z.object({
  select: DaySelectSchema.optional(),
  include: DayIncludeSchema.optional(),
  where: DayWhereUniqueInputSchema,
  create: z.union([ DayCreateInputSchema,DayUncheckedCreateInputSchema ]),
  update: z.union([ DayUpdateInputSchema,DayUncheckedUpdateInputSchema ]),
}).strict()

export const DayCreateManyArgsSchema: z.ZodType<Prisma.DayCreateManyArgs> = z.object({
  data: z.union([ DayCreateManyInputSchema,DayCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const DayDeleteArgsSchema: z.ZodType<Prisma.DayDeleteArgs> = z.object({
  select: DaySelectSchema.optional(),
  include: DayIncludeSchema.optional(),
  where: DayWhereUniqueInputSchema,
}).strict()

export const DayUpdateArgsSchema: z.ZodType<Prisma.DayUpdateArgs> = z.object({
  select: DaySelectSchema.optional(),
  include: DayIncludeSchema.optional(),
  data: z.union([ DayUpdateInputSchema,DayUncheckedUpdateInputSchema ]),
  where: DayWhereUniqueInputSchema,
}).strict()

export const DayUpdateManyArgsSchema: z.ZodType<Prisma.DayUpdateManyArgs> = z.object({
  data: z.union([ DayUpdateManyMutationInputSchema,DayUncheckedUpdateManyInputSchema ]),
  where: DayWhereInputSchema.optional(),
}).strict()

export const DayDeleteManyArgsSchema: z.ZodType<Prisma.DayDeleteManyArgs> = z.object({
  where: DayWhereInputSchema.optional(),
}).strict()