create or replace package util_package as
    procedure drop_table(table_name user_tables.table_name%type);
end;
/

create or replace package body util_package as
procedure drop_table(table_name user_tables.table_name%type) 
    is begin
        execute immediate 'DROP TABLE ' || table_name;
    exception
        when others then
          if sqlcode != -942 then
             raise;
          end if;
    end;
end;
/

create or replace package rent_package as
    procedure AddUser(
        username "users"."username"%type,
        email "users"."email"%type,
        password_hash "users"."passwordHash"%type
    );
    procedure GetAllUsers(out_users out sys_refcursor);
end;
/

create or replace package body rent_package as
    procedure AddUser(
        username "users"."username"%type,
        email "users"."email"%type,
        password_hash "users"."passwordHash"%type
    )
    is begin
        insert into "users"("username", "email", "passwordHash") 
            values(username, email, password_hash);
        commit;
    exception
        when others then
            rollback;
            raise;
    end;
    --
    procedure GetAllUsers(out_users out sys_refcursor)
    is begin
        open out_users for
            select "id", "username", "email", "passwordHash"
            from "users";
    end;
    --
end;
/
