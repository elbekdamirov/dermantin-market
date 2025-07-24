import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from './category/category.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DermantinModule } from './dermantin/dermantin.module';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { DermantinImagesModule } from './dermantin-images/dermantin-images.module';
import { RequestModule } from './request/request.module';
import { StoreModule } from './store/store.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrderModule } from './order/order.module';
import { SocialsModule } from './socials/socials.module';
import { PaymentsModule } from './payments/payments.module';
import { HistoryModule } from './history/history.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"postgres">("DB_CONNECTION"),
        host: config.get<string>("DB_HOST"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        port: config.get<number>("DB_PORT"),
        database: config.get<string>("DB_NAME"),
        entities: [__dirname + "dist/**/*.entitiy{.ts,.js}"],
        autoLoadEntities: true,
        logging: true,
        synchronize: true,
      }),
    }),

    CategoryModule,

    AdminModule,

    UserModule,

    AuthModule,

    DermantinModule,

    AdvertisementsModule,

    DermantinImagesModule,

    RequestModule,

    StoreModule,

    ReviewsModule,

    OrderModule,

    SocialsModule,

    PaymentsModule,

    HistoryModule,

    ChatModule,

    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
