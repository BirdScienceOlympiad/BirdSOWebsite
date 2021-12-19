from discord.ext import commands
import asyncio

bot = commands.Bot(
    command_prefix="!",  
    case_insensitive=True 
)

ids = [357337245318905856,562760141141966879,197856248182472704,357356251107295233,880318505751281714,476539928998838282] 

@bot.event 
async def on_ready():  # When the bot is ready:
    print("Bot is running.")

token = "OTIyMDA2NzI3NDgwNzEzMjg2.Yb7LrQ.QTWw50fTFVof69zm6kJFS1a-TKw" 

@bot.command(name="sb")
async def sb(ctx):
  if ctx.message.author.id in ids:
    global bdict
    await ctx.send("```\n"+"Division B Teams".ljust(35)+"Score\n"+"-"*40+"\n"+"\n".join([team.ljust(35)+str(bdict[team]).rjust(5) for team in bdict])+"\n```")
    channel = bot.get_channel(919126550979436584)
    await channel.send("```\n"+"Division B Teams".ljust(35)+"Score\n"+"-"*40+"\n"+"\n".join([team.ljust(35)+str(bdict[team]).rjust(5) for team in bdict])+"\n```")

@bot.command(name="a")
async def a(ctx, t, pts):
  if ctx.message.author.id in ids:
    global bdict
    bdict[list(bdict)[int(t)]]+=int(pts)
    await ctx.send("Added {} points to {}! They now have {} points.".format(pts,list(bdict)[int(t)],bdict[list(bdict)[int(t)]]))
    channel = bot.get_channel(919126550979436584)
    await channel.send("```\n"+"Division B Teams".ljust(35)+"Score\n"+"-"*40+"\n"+"\n".join([team.ljust(35)+str(bdict[team]).rjust(5) for team in bdict])+"\n```")
    f = open("scoresb.txt","w")
    f.write(str(bdict))
    f.close()


@bot.command(name="r")
async def r(ctx, t):
  if ctx.message.author.id in ids:
    global bdict
    bdict[list(bdict)[int(t)]]-=5
    await ctx.send("Subtracted 5 points from {}. They now have {} points.".format(list(bdict)[int(t)],bdict[list(bdict)[int(t)]]))
    channel = bot.get_channel(919126550979436584)
    await channel.send("```\n"+"Division B Teams".ljust(35)+"Score\n"+"-"*40+"\n"+"\n".join([team.ljust(35)+str(bdict[team]).rjust(5) for team in bdict])+"\n```")
    f = open("scoresb.txt","w")
    f.write(str(bdict))
    f.close()

@bot.command(name="set")
async def set(ctx, t, pts):
  if ctx.message.author.id in ids:
    global bdict
    bdict[list(bdict)[int(t)]]=int(pts)
    await ctx.send("Set {} to {} points.".format(list(bdict)[int(t)],pts))
    channel = bot.get_channel(919126550979436584)
    await channel.send("```\n"+"Division B Teams".ljust(35)+"Score\n"+"-"*40+"\n"+"\n".join([team.ljust(35)+str(bdict[team]).rjust(5) for team in bdict])+"\n```")
    f = open("scoresb.txt","w")
    f.write(str(bdict))
    f.close()

@bot.command(name="b")
async def b(ctx):
  if ctx.message.author.id in ids:
    channel = bot.get_channel(919126550979436584)
    await channel.send("Please buzz below:\n"+"-"*80)
    def check(m):
      return (m.content.lower().strip() in ["bz","buzz"] and m.channel == channel) or (m.content.lower()=="cancel" and m.author.id in ids)
    def check2(m):
      return m.content.lower()=="c" and m.author.id in ids
    msg = await bot.wait_for('message', timeout=120.0, check=check)
    if msg.content.lower().strip() in ["bz","buzz"]:
      await ctx.send(str(msg.author.display_name)+" has buzzed.")
      await channel.send(str(msg.author.display_name)+" has buzzed.")
      try:
        await bot.wait_for('message', timeout=11.0, check=check2)
        await ctx.send(str(msg.author.display_name)+" has answered.")
        await channel.send(str(msg.author.display_name)+" has answered.")
      except asyncio.TimeoutError:
        await ctx.send("Sorry, your 10 seconds are up.")
        await channel.send("Sorry, your 10 seconds are up.")
    else:
      await ctx.send("Question cancelled.")
      await channel.send("Question cancelled.")

fb = open("scoresb.txt","r")

bdict = eval(fb.readline().strip())

bot.run(token)
