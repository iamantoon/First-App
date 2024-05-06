FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

COPY ./API/API.csproj ./
RUN dotnet restore

COPY . .
RUN dotnet publish ./API/API.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

EXPOSE 80
ENTRYPOINT [ "dotnet", "API.dll" ]
